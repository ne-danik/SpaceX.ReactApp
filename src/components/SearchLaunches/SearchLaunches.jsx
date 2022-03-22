import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
// utils
import setContent from "../../utils/setContent";
// services
import useSpacexService from "../../services/useSpacexService";
// components
import { Card, CardContent, CardTitle } from "../Card/Card";

const SearchLaunches = (props) => {
  const [currentList, setCurrentList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [countElements] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [launchesEnded, setLaunchesEnded] = useState(false);

  const { process, setProcess, clearError, getAllLaunches } = useSpacexService();

  useEffect(() => {
    onRequest(true, props.launchName);
  }, [props.launchName])

  const onRequest = (initial, launchName) => {
    clearError();

    initial ? setLoadingMore(false) : setLoadingMore(true);

    getAllLaunches()
      .then((data) => {
        let arr = [];

        if (launchName.length > 0) {
          arr = filterByLaunch(data, launchName)
        }

        setSortedList(arr);
        setCurrentList([]);
        onCurrentListLoaded(arr, 0);
        setLoadingMore(false);
      })
      .then(() => setProcess('success'))
  }

  const filterByLaunch = (data, launchName) => {
    const reg = new RegExp(launchName, 'ig');
    setOffset(offset => offset + countElements);
    setCurrentPage(1);
    return data.filter(item => item.name.match(reg))
  }

  const onCurrentListLoaded = (data, offset) => {
    const currentSampling = data.slice(offset, offset + countElements);

    let launchesEndedTrigger = false;
    if (currentSampling.length < countElements) {
      launchesEndedTrigger = true;
    }

    setCurrentList(resultList => [...resultList, ...currentSampling]);
    setLaunchesEnded(launchesEndedTrigger);
  }

  const renderResultList = (arr) => {
    const elements = arr.map((item) => {
      const { id, name } = item
      return (
        <Link key={id} to={`/launches/${id}`}>
          <Card>
            <CardContent>
              <CardTitle content={name} />
            </CardContent>
          </Card>
        </Link>
      )
    });

    return (
      <div className="results">
        {elements.length > 0 ? elements : 'No results... :('}
      </div>
    )
  }

  return (
    <section className="section launches">
      <div className="container">
        <h2 className="section__title">Results</h2>
        <div className="section__content">
          {setContent(process, () => renderResultList(currentList), null)}
        </div>
      </div>
    </section>
  )
}

SearchLaunches.propTypes = {
  launchName: PropTypes.string,
}
export default SearchLaunches;