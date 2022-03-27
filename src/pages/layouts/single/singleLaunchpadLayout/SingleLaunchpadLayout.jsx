import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// hooks
import useSpacexService from '../../../../services/useSpacexService';
import useWeatherService from '../../../../services/useWeatherService';
// utils
import setContent from '../../../../utils/setContent';
// components
import { Skeleton } from '../../../../components/Skeleton/Skeleton';
import { Card, CardContent, CardTitle, CardMeta, CardImg } from '../../../../components/Card/Card';
import { Breadcrumbs, CrumbLabel, Divider, ForvardLink } from '../../../../components/Breadcrumbs/Breadcrumbs';
import { Status } from '../../../../components/Status/Status';
import { ExternalLink } from '../../../../components/AppLinks/AppLinks';
// styles
import './singleLaunchpadLayout.scss';

const SingleLaunchpadLayout = ({ data }) => {
  const [launchesData, setLaunchesData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [roketsData, setRocketsData] = useState([]);

  const { name, region, locality, latitude, longitude, details, status, launchAttempts, launchSuccesses, rockets, launches, image } = data;

  const { process, setProcess, clearError, getAllLaunches, getAllRockets } = useSpacexService();
  const { wtSetProcess, wtClearError, getWeather } = useWeatherService();

  useEffect(() => {
    onLaunchesRequest();
    return () => {
      setLaunchesData([]);
    };
  }, [])

  useEffect(() => {
    onWeatherRequest();
    return () => {
      setWeatherData([]);
    };
  }, [locality, latitude])

  useEffect(() => {
    onRocketRequest();
    return () => {
      setRocketsData([]);
    };
  }, [rockets])

  const onLaunchesRequest = () => {
    clearError();
    getAllLaunches()
      .then(onLaunchesDataLoaded)
      .then(() => setProcess('success'))
  }

  const onLaunchesDataLoaded = (data) => {
    const arr = data.filter(item => launches && launches.indexOf(item.id) !== -1)
    setLaunchesData(arr);
  }

  const onWeatherRequest = () => {
    wtClearError();
    if (latitude && longitude) {
      getWeather(latitude, longitude)
        .then(onWeatherDataLoaded)
        .then(() => wtSetProcess('success'))
    }
  }

  const onWeatherDataLoaded = (data) => {
    setWeatherData(data);
  }

  const onRocketRequest = () => {
    clearError();
    getAllRockets()
      .then(onRocketsDataLoaded)
      .then(() => setProcess('success'))
  }

  const onRocketsDataLoaded = (data) => {
    const arr = data.filter(item => rockets && rockets.indexOf(item.id) !== -1)
    setRocketsData(arr);
  }

  const getLaunchesThisYear = (data, year) => {
    let arr = [];
    const regexp = new RegExp(year);
    data.map((item) => item.date.match(regexp) ? arr.push(item) : null)
    return arr
  }

  const renderLaunches = (data) => {
    const all = data.map((item) => item.date.slice(0, 4));
    const years = [...new Set(all)];

    const yearsData = years.map((year) => {
      return { [`y${year}`]: getLaunchesThisYear(data, year) }
    });

    const renderElements = (yearsData) => {
      const reverse = yearsData.reverse();
      const elems = reverse.map((year) => {
        for (let launch in year) {
          const nameYear = launch.slice(1);
          const lnchs = year[launch].map(({ id, name, date }) => {
            return (
              <li key={id} className="accordion__item">
                <Link key={id} to={`/launches/${id}`} className="accordion__link">
                  <span className="accordion__link_name">{name}</span>
                  <span className="accordion__date">{moment(date).format('MMM DD')}</span>
                </Link>
              </li>
            )
          });
          return (
            <div key={launch} className="accordion__box">
              <button className="accordion__btn" onClick={handleClick}>{nameYear} <span> · {year[launch].length}</span></button>
              <div className="accordion__list">
                <ul className="accordion__items">
                  {lnchs}
                </ul>
              </div>
            </div>
          )
        }
      });
      return elems;
    }

    return (
      <div className="accordion">
        {renderElements(yearsData)}
      </div>
    )
  }

  const renderRockets = (data) => {
    return (
      data.map((item) => {
        const { id, name, images, country } = item;
        return (
          <Link key={id} to={`/rockets/${id}`}>
            <Card variant='image' style={{ width: '275px' }}>
              <CardImg urlImage={images[0]} altImage={name} />
              <CardContent>
                <CardTitle content={name} />
                <CardMeta content={country} />
              </CardContent>
            </Card>
          </Link>
        )
      })
    )
  }

  const handleClick = (e) => {
    e.target.parentElement.classList.toggle('open');
    const list = e.target.nextElementSibling;
    if (list.style.maxHeight) {
      list.style.maxHeight = null;
    } else {
      list.style.maxHeight = list.scrollHeight + "px";
    }
  }

  return (
    <>
      <Breadcrumbs>
        <ForvardLink />
        <Divider />
        <CrumbLabel label="Launchpad" />
      </Breadcrumbs>

      <article className="article">
        <div className="article__bg" style={{ backgroundImage: `url(${image})` }}>
          <div className="article__header">
            <div className="container">
              {status ? <Status status={status} style={{ marginBottom: '24px' }} /> : <Skeleton width="40px" />}
              <h2 className="article__title">
                {name ? name : <Skeleton width="50%" />}
              </h2>
              <p className="article__subtitle">
                <span>Region:</span>
                {region ? region : <Skeleton width="100px" />}
              </p>
              <p className="article__subtitle">
                <span>Locality:</span>
                {locality ? (
                  <ExternalLink url={`https://www.google.com/maps?ll=${latitude},${longitude}`} className="article__locate_link" label={locality} iconHeight="12px" iconWidth="12px" />
                ) : <Skeleton width="100px" />}
              </p>
              <p className="article__subtitle">
                <span>Weather:</span>
                {weatherData.weather ? weatherData.weather : <Skeleton width="60px" />}
                {weatherData.tempC ? ', ' + weatherData.tempC : <Skeleton width="30px" />}
              </p>
              <p className="article__subtitle">
                <span>Wind:</span>
                {weatherData.wind ? weatherData.wind : <Skeleton width="60px" />}
              </p>
              <div className="article__statistics">
                <div className="statistic_box">
                  <span className="number">
                    {String(launchAttempts).length ? launchAttempts : <Skeleton width="100px" />}
                  </span>
                  <span className="label">Attempts launches</span>
                </div>
                <div className="statistic_box">
                  <span className="number">
                    {String(launchSuccesses).length ? launchSuccesses : <Skeleton width="100px" />}
                  </span>
                  <span className="label">Successful launches</span>
                </div>
              </div>
              <div className="scroll_down">
                <svg width="64" height="64" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M76 36L48 64L20 36" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="article__content">
          <div className="container">
            <div className="text-block">
              <h3 className="h3 text-block__title">About</h3>
              <p className="article__text">
                {details ? details : (
                  <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton width="50%" />
                  </>
                )}
              </p>
            </div>
            <div className="text-block">
              <h3 className="h3 text-block__title">Rockets</h3>
              <div>
                {rockets && rockets.length ? (
                  setContent(process, () => renderRockets(roketsData))
                ) : (
                  'No rockets'
                )}
              </div>
            </div>
            <div className="text-block">
              <h3 className="h3 text-block__title">Launches</h3>
              {launches && launches.length ? (
                setContent(process, () => renderLaunches(launchesData))
              ) : (
                <p>There were no launches on the launchpad yet.</p>
              )}
            </div>
          </div>
        </div>
      </article >
    </>
  )
}

export default SingleLaunchpadLayout;