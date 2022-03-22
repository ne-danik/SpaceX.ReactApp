import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// services
import useSpacexService from "../../services/useSpacexService";
// utils
import setContent from "../../utils/setContent";
// components
import Spinner from "../../components/Spinner/Spinner";
import { Skeleton } from "../../components/Skeleton/Skeleton";
import { Card, CardContent, CardTitle, CardMeta, CardImg } from '../../components/Card/Card';

const CrewPage = () => {
  const [crewList, setCrewList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [countElements] = useState(8);
  const [loadingMore, setLoadingMore] = useState(false);
  const [crewEnded, setCrewEnded] = useState(false);

  const { process, setProcess, clearError, getAllCrewMembers } = useSpacexService();

  useEffect(() => {
    onRequest(true);
  }, [])

  const onRequest = (initial) => {
    clearError();

    initial ? setLoadingMore(false) : setLoadingMore(true);

    getAllCrewMembers()
      .then(onCrewListLoaded)
      .then(() => setProcess('success'))
  }

  const onCrewListLoaded = (data) => {
    const currentSampling = data.slice(offset, offset + countElements);

    let crewEndedTrigger = false;
    if (currentSampling.length < countElements) {
      crewEndedTrigger = true;
    }

    setCrewList(crewList => [...crewList, ...currentSampling]);
    setOffset(offset => offset + countElements);
    setLoadingMore(false);
    setCrewEnded(crewEndedTrigger);
  }

  const renderList = (data) => {
    const items = data.map((item) => {
      const { id, name, image, agency } = item;
      return (
        <Link key={id} to={`/crew/${id}`}>
          <Card variant='image'>
            <CardImg urlImage={image} altImage={name} />
            <CardContent>
              <CardTitle content={name} />
              <CardMeta content={agency} />
            </CardContent>
          </Card>
        </Link>
      )
    });
    return (
      <div className="cards">
        {items}
      </div>
    )
  }

  return (
    <>
      <section className="section">
        <div className="container">
          <h2 className="section__title">Crew</h2>
          <div className="div">
            {setContent(process, () => renderList(crewList), null, CardSkeleton, loadingMore)}
            {
              crewList.length ? (
                <button
                  type="button"
                  onClick={() => onRequest()}
                  className="btn btn_blue_color"
                  style={{ 'display': crewEnded ? 'none' : 'block' }}
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
    </>
  )
}

const CardSkeleton = () => {
  return (
    <div className="cards">
      <Card variant='image'>
        <CardImg content={<Skeleton height="100%" />} />
        <CardContent>
          <CardTitle content={<Skeleton width="60%" />} noLinkIcon />
          <CardMeta content={<Skeleton width="30%" />} />
        </CardContent>
      </Card>
      <Card variant='image'>
        <CardImg content={<Skeleton height="100%" />} />
        <CardContent>
          <CardTitle content={<Skeleton width="60%" />} noLinkIcon />
          <CardMeta content={<Skeleton width="30%" />} />
        </CardContent>
      </Card>
      <Card variant='image'>
        <CardImg content={<Skeleton height="100%" />} />
        <CardContent>
          <CardTitle content={<Skeleton width="60%" />} noLinkIcon />
          <CardMeta content={<Skeleton width="30%" />} />
        </CardContent>
      </Card>
      <Card variant='image'>
        <CardImg content={<Skeleton height="100%" />} />
        <CardContent>
          <CardTitle content={<Skeleton width="60%" />} noLinkIcon />
          <CardMeta content={<Skeleton width="30%" />} />
        </CardContent>
      </Card>
      <Card variant='image'>
        <CardImg content={<Skeleton height="100%" />} />
        <CardContent>
          <CardTitle content={<Skeleton width="60%" />} noLinkIcon />
          <CardMeta content={<Skeleton width="30%" />} />
        </CardContent>
      </Card>
      <Card variant='image'>
        <CardImg content={<Skeleton height="100%" />} />
        <CardContent>
          <CardTitle content={<Skeleton width="60%" />} noLinkIcon />
          <CardMeta content={<Skeleton width="30%" />} />
        </CardContent>
      </Card>
      <Card variant='image'>
        <CardImg content={<Skeleton height="100%" />} />
        <CardContent>
          <CardTitle content={<Skeleton width="60%" />} noLinkIcon />
          <CardMeta content={<Skeleton width="30%" />} />
        </CardContent>
      </Card>
      <Card variant='image'>
        <CardImg content={<Skeleton height="100%" />} />
        <CardContent>
          <CardTitle content={<Skeleton width="60%" />} noLinkIcon />
          <CardMeta content={<Skeleton width="30%" />} />
        </CardContent>
      </Card>
    </div>
  )
}

export default CrewPage;