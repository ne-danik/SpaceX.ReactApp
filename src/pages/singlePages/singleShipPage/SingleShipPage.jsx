import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// services
import useSpacexService from '../../../services/spasexService';
// utils
import setContent from '../../../utils/setContent';
// components
import { Breadcrumbs, CrumbLabel, Divider, ForvardLink } from '../../../components/Breadcrumbs/Breadcrumbs';
import { Skeleton } from '../../../components/Skeleton/Skeleton';
// styles
import './singleShipPage.scss';
// resources
import notFoundImg from '../../../resources/images/not_found.jpg';

const SingleShipLayout = ({ data }) => {
  const { name, type, roles, port, active, year, weight, launches, image, } = data;

  const [launchesList, setLaunchesList] = useState([]);

  const { process, setProcess, clearError, getAllLaunches } = useSpacexService();

  useEffect(() => {
    clearError();
    getAllLaunches()
      .then((data) => {
        const arr = data.filter((item) => launches.includes(item?.id) ? item : null)
        setLaunchesList(arr)
      })
      .then(() => setProcess('success'))
  }, [launches])

  const renderLaunches = (data) => {
    const elements = data.length ? (
      data.map((item) => {
        return (
          <li key={item.id} className="ship__launches-item">
            <Link className="ship__launches-link" to={`/launches/${item.id}`}>
              <span className="ship__launches-name">{item.name}</span>
              <span className="ship__launches-date">{moment(item.date).format('MMM DD, YYYY')}</span>
            </Link>
          </li>
        )
      })
    ) : (
      'No launches'
    )
    return (
      <ul className="ship__launches-items">
        {elements}
      </ul>
    )
  }

  return (
    <>
      <Breadcrumbs>
        <ForvardLink />
        <Divider />
        <CrumbLabel label="Ship" />
      </Breadcrumbs>

      <article className="article">
        <div className="container">
          <div className="article__inner">
            <h2 className="article__title">{name}</h2>
            <div className="article__content ship">
              <div className="ship__left">
                <div className="article__text">
                  Status: <span>{active ? 'Active' : 'Inactive'}</span>
                </div>
                <div className="article__text">
                  Type: <span>{type ? type : '—'}</span>
                </div>
                <div className="article__text">
                  Roles: <span>{roles ? roles.join(', ') : '—'}</span>
                </div>
                <div className="article__text">
                  Port: <span>{port ? port : '—'}</span>
                </div>
                <div className="article__text">
                  Year Built: <span>{year ? year : '—'}</span>
                </div>
                <div className="article__text">
                  Weight: <span>{weight ? weight.toLocaleString('de-DE') + 'kg' : '—'}</span>
                </div>
                <div className="article__text">
                  Launches: {setContent(process, () => renderLaunches(launchesList), null, LaunchesSkeleton)}
                </div>
              </div>
              <div className="ship__right">
                {image ? (
                  <img className='ship__img' src={image} alt={name} />
                ) : (
                  <img className='ship__img' src={notFoundImg} alt={name} />
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

const LaunchesSkeleton = () => {
  return (
    <div className="article__text">
      <Skeleton width="200px" />
    </div>
  )
}

export default SingleShipLayout