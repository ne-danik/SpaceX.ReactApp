import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
// hooks
import useSpacexService from "../../services/useSpacexService";
// utils
import setContent from "../../utils/setContent";
// components
import { Skeleton } from "../Skeleton/Skeleton";
import Spinner from "../Spinner/Spinner";
// style
import './launchesList.scss';

const LaunchesList = () => {
  const [launchesList, setLaunchesList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [countElements] = useState(4);
  const [loadingMore, setLoadingMore] = useState(false);
  const [laucnhesEnded, setLaunchesEnded] = useState(false);

  const { process, setProcess, clearError, getAllPastLaunches } = useSpacexService();

  useEffect(() => {
    onRequest(true);
  }, [])

  const onRequest = (initial) => {
    clearError();

    initial ? setLoadingMore(false) : setLoadingMore(true);

    getAllPastLaunches()
      .then(onLaunchesListLoaded)
      .then(() => setProcess('success'))
  }

  const onLaunchesListLoaded = (data) => {
    const reverse = data.reverse();
    const currentSampling = reverse.slice(offset, offset + countElements);

    let launchesEndedTrigger = false;
    if (currentSampling.length < countElements) {
      launchesEndedTrigger = true;
    }

    setLaunchesList(launchesList => [...launchesList, ...currentSampling]);
    setOffset(offset => offset + countElements);
    setLoadingMore(false);
    setLaunchesEnded(launchesEndedTrigger);
  }

  const renderCards = (data) => {
    const items = data.map(item => <Card key={item.id} data={item} />)
    return (
      <div className="cards">
        {items}
      </div>
    )
  }

  return (
    <section className="section launches">
      <div className="container">
        <h2 className="section__title">Latest launches</h2>
        <div className="section__content">
          {setContent(process, () => renderCards(launchesList), null, CardSkeleton, loadingMore)}
          {
            launchesList.length ? (
              <button
                type="button"
                onClick={() => onRequest()}
                className="btn btn_blue_color"
                style={{ 'display': laucnhesEnded ? 'none' : 'block' }}
                disabled={loadingMore} >
                {
                  loadingMore ? <Spinner size='18px' color='#ffffff' /> : 'Show more'
                }
              </button>
            ) : null
          }
        </div>
      </div>
    </section>
  )
}

const Card = ({ data }) => {
  const { id, date, name, patch } = data;
  return (
    <div className="card card_launches" data-id={id}>
      <Link to={`/launches/${id}`} className="card__link">
        {/* {patch ? <img className="card__patch" src={patch} alt="Mission patch" /> : null} */}
        <p className="card__meta">{moment(date).format('LL')}</p>
        <p className="card__title">
          {name}
          <svg className="card__title-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.33334 5.33333C3.83487 5.33333 2.66668 6.50152 2.66668 8C2.66668 9.49848 3.83487 10.6667 5.33334 10.6667H6.66668C7.03487 10.6667 7.33334 10.9651 7.33334 11.3333C7.33334 11.7015 7.03487 12 6.66668 12H5.33334C3.09849 12 1.33334 10.2349 1.33334 8C1.33334 5.76514 3.09849 4 5.33334 4H6.66668C7.03487 4 7.33334 4.29848 7.33334 4.66667C7.33334 5.03486 7.03487 5.33333 6.66668 5.33333H5.33334ZM8.66668 4.66667C8.66668 4.29848 8.96515 4 9.33334 4H10.6667C12.9015 4 14.6667 5.76514 14.6667 8C14.6667 10.2349 12.9015 12 10.6667 12H9.33334C8.96515 12 8.66668 11.7015 8.66668 11.3333C8.66668 10.9651 8.96515 10.6667 9.33334 10.6667H10.6667C12.1652 10.6667 13.3333 9.49848 13.3333 8C13.3333 6.50152 12.1652 5.33333 10.6667 5.33333H9.33334C8.96515 5.33333 8.66668 5.03486 8.66668 4.66667ZM4.66668 8C4.66668 7.63181 4.96515 7.33333 5.33334 7.33333H10.6667C11.0349 7.33333 11.3333 7.63181 11.3333 8C11.3333 8.36819 11.0349 8.66667 10.6667 8.66667H5.33334C4.96515 8.66667 4.66668 8.36819 4.66668 8Z"
              fill="#0044FF" />
          </svg>
        </p>
      </Link>
    </div>
  )
}

const CardSkeleton = () => {
  return (
    <div className="cards">
      <div className="card card_launches">
        <div className="card__link">
          <p className="card__meta"><Skeleton width="20%" /></p>
          <p className="card__title"><Skeleton width="60%" /></p>
        </div>
      </div>
      <div className="card card_launches">
        <div className="card__link">
          <p className="card__meta"><Skeleton width="20%" /></p>
          <p className="card__title"><Skeleton width="60%" /></p>
        </div>
      </div>
      <div className="card card_launches">
        <div className="card__link">
          <p className="card__meta"><Skeleton width="20%" /></p>
          <p className="card__title"><Skeleton width="60%" /></p>
        </div>
      </div>
      <div className="card card_launches">
        <div className="card__link">
          <p className="card__meta"><Skeleton width="20%" /></p>
          <p className="card__title"><Skeleton width="60%" /></p>
        </div>
      </div>
    </div>
  )
}

export default LaunchesList