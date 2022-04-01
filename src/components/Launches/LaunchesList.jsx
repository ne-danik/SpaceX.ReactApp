import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
// hooks
import useSpacexService from "../../services/spasexService";
// utils
import setContent from "../../utils/setContent";
// components
import { Card, CardContent, CardTitle, CardMeta } from '../Card/Card';
import { Skeleton } from "../Skeleton/Skeleton";
import Button from "../Button/Button";

const LaunchesList = () => {
  const [dataList, setDataList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(4);
  const [loadingMore, setLoadingMore] = useState(false);
  const [dataEnded, setDataEnded] = useState(false);

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
    const currentSampling = reverse.slice(offset, offset + limit);

    let endedTrigger = false;
    if (currentSampling.length < limit) {
      endedTrigger = true;
    }

    setDataList(dataList => [...dataList, ...currentSampling]);
    setOffset(offset => offset + limit);
    setLoadingMore(false);
    setDataEnded(endedTrigger);
  }

  const renderCards = (data) => {
    const items = data.map((item) => {
      const { id, date, name } = item;
      return (
        <Link key={id} to={`/launches/${id}`}>
          <Card>
            <CardContent>
              <CardMeta content={moment(date).format('LL')} />
              <CardTitle content={name} />
            </CardContent>
          </Card>
        </Link>
      )
    })
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
          {setContent(process, () => renderCards(dataList), null, CardSkeleton, loadingMore)}
          {
            dataEnded ? null : <Button title="Show more" action={() => onRequest()} isNone={dataEnded} disabled={loadingMore} />
          }
        </div>
      </div>
    </section>
  )
}

const CardSkeleton = () => {
  return (
    <div className="cards">
      <Card>
        <CardContent>
          <CardMeta content={<Skeleton width="20%" />} />
          <CardTitle content={<Skeleton width="60%" />} noLinkIcon />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardMeta content={<Skeleton width="20%" />} />
          <CardTitle content={<Skeleton width="60%" />} noLinkIcon />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardMeta content={<Skeleton width="20%" />} />
          <CardTitle content={<Skeleton width="60%" />} noLinkIcon />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardMeta content={<Skeleton width="20%" />} />
          <CardTitle content={<Skeleton width="60%" />} noLinkIcon />
        </CardContent>
      </Card>
    </div>
  )
}

export default LaunchesList