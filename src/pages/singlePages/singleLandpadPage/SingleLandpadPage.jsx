import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// hooks
import useSpacexService from '../../../services/spasexService';
import useWeatherService from '../../../services/useWeatherService';
// utils
import setContent from '../../../utils/setContent';
// components
import { Skeleton } from '../../../components/Skeleton/Skeleton';
import { Breadcrumbs, CrumbLabel, Divider, ForvardLink } from '../../../components/Breadcrumbs/Breadcrumbs';
import { Status } from '../../../components/Status/Status';
import { ExternalLink } from '../../../components/AppLinks/AppLinks';

const SingleLandpadLayout = ({ data }) => {
  const [launchesData, setLaunchesData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  const { name, region, locality, latitude, longitude, details, status, landingAttempts, landingSuccesses, launches, wikipedia, image } = data;

  const { process, setProcess, clearError, getAllLaunches } = useSpacexService();
  const { wtSetProcess, wtClearError, getWeather } = useWeatherService();

  useEffect(() => {
    onRequest();
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


  const onRequest = () => {
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

  const getLaunchesThisYear = (data, year) => {
    let arr = [];
    const regexp = new RegExp(year);
    data.map((item) => item.date.match(regexp) ? arr.push(item) : null)
    return arr
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

  return (
    <>
      <Breadcrumbs>
        <ForvardLink />
        <Divider />
        <CrumbLabel label="Landpad" />
      </Breadcrumbs>

      <article className="article hero">
        <div className="hero__bg" style={{ backgroundImage: `url(${image})` }}>
          <div className="hero__content">
            <div className="container">
              {status ? <Status status={status} style={{ marginBottom: '40px' }} /> : <Skeleton width="40px" />}
              <h2 className="hero__title">
                {name ? name : <Skeleton width="50%" />}
              </h2>
              <p className="hero__text-block">
                <span>Region:</span>
                {region ? region : <Skeleton width="100px" />}
              </p>
              <p className="hero__text-block">
                <span>Locality:</span>
                {locality ? (
                  <ExternalLink url={`https://www.google.com/maps?ll=${latitude},${longitude}`} className="hero__link" label={locality} iconHeight="12px" iconWidth="12px" />
                ) : <Skeleton width="100px" />}
              </p>
              <p className="hero__text-block">
                <span>Weather:</span>
                {weatherData.weather ? weatherData.weather : <Skeleton width="60px" />}
                {weatherData.tempC ? ', ' + weatherData.tempC : <Skeleton width="30px" />}
              </p>
              <p className="hero__text-block">
                <span>Wind:</span>
                {weatherData.wind ? weatherData.wind : <Skeleton width="60px" />}
              </p>
              <div className="hero__statistics">
                <div className="statistic_box">
                  <span className="number">
                    {String(landingAttempts).length ? landingAttempts : <Skeleton width="100px" />}
                  </span>
                  <span className="label">Attempts landing</span>
                </div>
                <div className="statistic_box">
                  <span className="number">
                    {String(landingSuccesses).length ? landingSuccesses : <Skeleton width="100px" />}
                  </span>
                  <span className="label">Successful landing</span>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll_down">
            <svg width="64" height="64" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M76 36L48 64L20 36" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
              {
                wikipedia ? (
                  <p className="article__social">
                    <a className="wiki_link" href={wikipedia} rel="nofollow noopener noreferrer" target="_blank">
                      <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25.4598 2.36659C24.3498 4.87495 20.9547 12.8198 18.6892 17.9983C18.6861 18.0006 18.0957 17.9971 18.0941 17.9962L14.5213 9.58088C13.1053 12.3581 11.5364 15.2451 10.1948 17.9923C10.1868 18.0062 9.54571 17.9987 9.5449 17.9899C7.49391 13.2025 5.36735 8.44651 3.30563 3.66266C2.82832 2.49323 1.15392 0.612328 0.00798758 0.623146C0.00798758 0.487308 0.00159427 0.184154 0 0.000813729L7.06256 0L7.05695 0.611515C6.22777 0.649907 4.79464 1.17911 5.16612 2.09459C6.16148 4.24384 9.68594 12.5701 10.6385 14.6839C11.3031 13.383 13.1592 9.91519 13.9238 8.44936C13.3246 7.21991 11.3447 2.62981 10.7512 1.47388C10.3034 0.720185 9.17984 0.627945 8.31471 0.614768C8.31471 0.42183 8.32472 0.273221 8.32114 0.00837777L14.5293 0.0275745V0.591587C13.6889 0.614769 12.8933 0.92744 13.2539 1.73108C14.0891 3.4646 14.5768 4.69877 15.3433 6.30207C15.5881 5.83233 16.8431 3.25767 17.4415 1.89888C17.8029 0.995358 17.2629 0.657065 15.7511 0.616314C15.7711 0.467705 15.7579 0.16935 15.7711 0.0271672L21.1328 0.0323731L21.1353 0.591993C20.1499 0.630304 19.1298 1.15511 18.5974 1.96997L16.0155 7.32459C16.2987 8.03274 18.7811 13.5475 19.0423 14.159L24.3802 1.83812C24.0003 0.840812 22.7888 0.617941 22.3151 0.607123C22.3181 0.46042 22.319 0.242548 22.3197 0.0506669L22.3199 0.00325337L27.8922 0.0191959L27.9003 0.0471769L27.8911 0.60395C26.6684 0.641123 25.9123 1.29493 25.4598 2.36659Z" fill="white" />
                      </svg>
                      <span>Read</span>
                    </a>
                  </p>
                ) : null
              }
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

export default SingleLandpadLayout;