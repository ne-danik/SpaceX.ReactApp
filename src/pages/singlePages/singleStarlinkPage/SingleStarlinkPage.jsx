import { useState, useEffect } from 'react';
import moment from 'moment';
// services
import useSpacexService from '../../../services/spasexService';
// utils
import setContent from '../../../utils/setContent';
// components
import { Breadcrumbs, CrumbLabel, Divider, ForvardLink } from '../../../components/Breadcrumbs/Breadcrumbs';
import { Link } from 'react-router-dom';

const SingleStarlinkLayout = ({ data }) => {
  const { name, version, launch, launchDate } = data;

  const [launchData, setLaucnhData] = useState({});

  const { process, setProcess, clearError, getOneLaunch } = useSpacexService();

  useEffect(() => {
    clearError();
    getOneLaunch(launch)
      .then(setLaucnhData)
      .then(() => setProcess('success'))
  }, [launch])

  return (
    <>
      <Breadcrumbs>
        <ForvardLink />
        <Divider />
        <CrumbLabel label="Starlink" />
      </Breadcrumbs>

      <article className="article starlink">
        <div className="container">
          <div className="article__inner">
            <h2 className="article__title">{name}</h2>
            <div className="article__content">
              <p className="article__text">Starlink version: <span>{version}</span></p>
              <p className="article__text">
                Launch date: <span>{moment(launchDate).format('LL')}</span>
              </p>
              <p className="article__text">
                Launch: {setContent(process, Launch, launchData)}
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

const Launch = ({ data }) => {
  const { id, name, flightNumber } = data;
  return (
    <Link to={`/launches/${id}`}>{`#${flightNumber} ${name}`}</Link>
  )
}

export default SingleStarlinkLayout;