import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// utils
import setContent from "../../utils/setContent";
// services
import useSpacexService from "../../services/spasexService";
// styles
import './searchResults.scss';
import Button from "../Button/Button";

const SearchResultLaunches = ({ searchValue }) => {
  const [sortedData, setSortedData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const [loadingMore, setLoadingMore] = useState(false);
  const [dataEnded, setDataEnded] = useState(false);
  const [countSorted, setCountSorted] = useState(0);

  const { process, setProcess, clearError, getAllLaunches } = useSpacexService();

  useEffect(() => {
    onRequest(searchValue);
  }, [searchValue])

  const onRequest = (searchValue) => {
    clearError();
    getAllLaunches()
      .then((data) => {
        let arr = [];

        if (searchValue) {
          arr = data.filter((item) => RegExp(searchValue, "ig").test(item.name))
        }

        setSortedData(arr);
        setCountSorted(arr.length);
        setCurrentData([]);
        setOffset(0);
        onCurrentDataLoaded(arr, 0);
        setLoadingMore(false);
      })
      .then(() => setProcess('success'))
  }

  const onCurrentDataLoaded = (data, offset) => {
    const currentSampling = data.slice(offset, offset + limit);

    setCurrentData(resultList => [...resultList, ...currentSampling]);
    setOffset(offset => offset + limit);

    let dataEndedTrigger = false;
    if (currentSampling.length < limit || (currentData.length + currentSampling.length) === sortedData.length) {
      dataEndedTrigger = true;
    }
    setDataEnded(dataEndedTrigger);
  }

  const onLoadMore = (offset) => {
    setLoadingMore(true);
    onCurrentDataLoaded(sortedData, offset);
    setLoadingMore(false);
  }

  const renderResultList = (arr) => {
    const elements = arr.map((item) => {
      const { id, name } = item
      return (
        <div key={id} className="result">
          <Link to={`/launches/${id}`} className="result__link">
            {name}
          </Link>
        </div>
      )
    });
    return (
      <>
        <div className="results">
          {elements.length > 0 ? elements : (
            <>
              No results found for <strong>{searchValue}</strong>
            </>
          )}
        </div>
        {
          dataEnded ? null : <Button title="Load more" action={() => onLoadMore(offset)} isNone={dataEnded} disabled={loadingMore} />
        }
      </>
    )
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="section__title">Results by Launches</h2>
        <p className="section__subtitle">Found {countSorted} matches</p>
        <div className="section__content">
          {setContent(process, () => renderResultList(currentData), null)}
        </div>
      </div>
    </section>
  )
}

export default SearchResultLaunches;