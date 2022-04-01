import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
// hooks
import useSpacexService from "../../services/spasexService";
// utils
import setContent from "../../utils/setContent";
// components
import { Card, CardContent, CardTitle, CardMeta, CardImg, CardDesc } from '../Card/Card';
import { Skeleton } from "../Skeleton/Skeleton";

const NextLaunch = () => {
  const [nextLaunch, setNextLaunch] = useState([]);
  const { process, setProcess, clearError, getNextLaunch } = useSpacexService();

  useEffect(() => {
    onRequest();
  }, [])

  const onRequest = () => {
    clearError();
    getNextLaunch()
      .then(onNextLaunchLoaded)
      .then(() => setProcess('success'))
  }

  const onNextLaunchLoaded = (data) => {
    setNextLaunch(data);
    return data;
  }

  return (
    <section className="section launches">
      <div className="container">
        <h2 className="section__title">Next launch</h2>
        <div className="section__content">
          {setContent(process, View, nextLaunch, CardSkeleton)}
        </div>
      </div>
    </section>
  )
}

const View = ({ data }) => {
  const { id, date, name, patch_sm, details } = data;
  return (
    <>
      <Link to={`/launches/${id}`}>
        <Card variant='text-image'>
          <CardContent>
            <CardMeta content={moment(date).format('MMMM Do YYYY, h:mm a')} />
            <CardTitle content={name} />
            <CardDesc content={details} />
          </CardContent>
          <CardImg style={{ objectFit: 'contain' }} urlImage={patch_sm} altImage={name} />
        </Card>
      </Link>
    </>
  )
}

const CardSkeleton = () => {
  return (
    <Card variant='text-image'>
      <CardContent>
        <CardMeta content={<Skeleton width="20%" />} />
        <CardTitle content={<Skeleton width="60%" />} noLinkIcon />
        <CardDesc content={
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton width="50%" />
          </>
        } />
      </CardContent>
      <CardImg content={<Skeleton height="100%" />} />
    </Card>
  )
}

export default NextLaunch;