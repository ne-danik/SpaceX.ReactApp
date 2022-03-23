import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
// utils
import setContent from "../../utils/setContent";
// services
import useSpacexService from "../../services/useSpacexService";
// components
import Spinner from "../Spinner/Spinner";
// styles
import './searchResults.scss';

const SearchLaunches = (props) => {
  const [currentList, setCurrentList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [countElements] = useState(20);
  const [loadingMore, setLoadingMore] = useState(false);
  const [launchesEnded, setLaunchesEnded] = useState(false);
  const [countSampl, setCountSampl] = useState(0);

  const { process, setProcess, clearError, getAllLaunches } = useSpacexService();

  useEffect(() => {
    onRequest(props.launchName);
  }, [props.launchName])

  const onRequest = (launchName) => {
    clearError();

    getAllLaunches()
      .then((data) => {
        let arr = [];

        if (launchName.length > 0) {
          arr = filterByLaunch(data, launchName)
        }

        setSortedList(arr);
        setCountSampl(arr.length);
        setCurrentList([]);
        setOffset(0);
        onCurrentListLoaded(arr, 0);
        setLoadingMore(false);
      })
      .then(() => setProcess('success'))
  }

  const filterByLaunch = (data, launchName) => {
    const reg = new RegExp(launchName, 'ig');
    return data.filter(item => item.name.match(reg))
  }

  const onCurrentListLoaded = (data, offset) => {
    const currentSampling = data.slice(offset, offset + countElements);

    setCurrentList(resultList => [...resultList, ...currentSampling]);
    setOffset(offset => offset + countElements);

    let launchesEndedTrigger = false;
    if (currentSampling.length < countElements || (currentList.length + currentSampling.length) === sortedList.length) {
      launchesEndedTrigger = true;
    }
    setLaunchesEnded(launchesEndedTrigger);
  }

  const onLoadMore = (offset) => {
    setLoadingMore(true);
    onCurrentListLoaded(sortedList, offset);
    setLoadingMore(false);
  }

  const renderResultList = (arr) => {
    const elements = arr.map((item, idx) => {
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
              No results found for <strong>{props.launchName}</strong>
            </>
          )}
        </div>
        {
          currentList.length ? (
            <button
              type="button"
              onClick={() => onLoadMore(offset)}
              className="btn btn_blue_color"
              style={{ 'display': launchesEnded ? 'none' : 'block' }}
              disabled={loadingMore}
            >
              {
                loadingMore ? <Spinner size='18px' color='#ffffff' /> : 'Load more'
              }
            </button>
          ) : null
        }
      </>
    )
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="section__title">Results by Launches</h2>
        <p className="section__subtitle">Found {countSampl} matches</p>
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