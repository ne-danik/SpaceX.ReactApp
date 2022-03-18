import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// hooks
import useSpacexService from '../../../services/useSpacexService';
import useWeatherService from '../../../services/useWeatherService';
// styles
import './singleLandpadLayout.scss';

const SingleLandpadLayout = ({ data }) => {
  const [launchesData, setLaunchesData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  const { name, region, locality, latitude, longitude, details, landingAttempts, landingSuccesses, launches, wikipedia, image } = data;

  const { process, setProcess, clearError, getAllLaunches } = useSpacexService();
  const { wtProcess, wtSetProcess, wtClearError, getWeather } = useWeatherService();

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
      <div className="breadcrumbs">
        <div className='container'>
          <div className="breadcrumbs__inner">
            <Link to="/" className='forward'>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.7071 5.29289C12.0976 5.68342 12.0976 6.31658 11.7071 6.70711L7.41421 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H7.41421L11.7071 17.2929C12.0976 17.6834 12.0976 18.3166 11.7071 18.7071C11.3166 19.0976 10.6834 19.0976 10.2929 18.7071L4.29289 12.7071C4.10536 12.5196 4 12.2652 4 12C4 11.7348 4.10536 11.4804 4.29289 11.2929L10.2929 5.29289C10.6834 4.90237 11.3166 4.90237 11.7071 5.29289Z" fill="#0044FF" />
              </svg>
              Go back
            </Link>
            <span className='breadcrumbs__separator'></span>
            <span>Landpad</span>
          </div>
        </div>
      </div>

      <article className="article">
        <div className="article__bg" style={{ backgroundImage: `url(${image})` }}>
          <div className="article__header">
            <div className="container">
              <h2 className="article__title">{name}</h2>
              <p className="article__subtitle">
                <span>Region:</span>{region}
              </p>
              <p className="article__subtitle">
                <span>Locality:</span>
                <a className="article__locate_link" href={`https://www.google.com/maps?ll=${latitude},${longitude}`} rel="nofollow" target="_blank">
                  {locality}
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.33333 3.33333C8.96514 3.33333 8.66667 3.03486 8.66667 2.66667C8.66667 2.29848 8.96514 2 9.33333 2H13.3333C13.5101 2 13.6797 2.07024 13.8047 2.19526C13.9298 2.32029 14 2.48986 14 2.66667L14 6.66667C14 7.03486 13.7015 7.33333 13.3333 7.33333C12.9651 7.33333 12.6667 7.03486 12.6667 6.66667L12.6667 4.27614L6.4714 10.4714C6.21106 10.7318 5.78894 10.7318 5.5286 10.4714C5.26825 10.2111 5.26825 9.78894 5.5286 9.52859L11.7239 3.33333H9.33333ZM2 4.66667C2 3.93029 2.59695 3.33333 3.33333 3.33333H6.66667C7.03486 3.33333 7.33333 3.63181 7.33333 4C7.33333 4.36819 7.03486 4.66667 6.66667 4.66667H3.33333V12.6667H11.3333V9.33333C11.3333 8.96514 11.6318 8.66667 12 8.66667C12.3682 8.66667 12.6667 8.96514 12.6667 9.33333V12.6667C12.6667 13.403 12.0697 14 11.3333 14H3.33333C2.59695 14 2 13.403 2 12.6667V4.66667Z" fill="#ffffff" />
                  </svg>
                </a>
              </p>
              <p className="article__subtitle">
                <span>Weather:</span>{weatherData.weather}, {weatherData.tempC}
              </p>
              <p className="article__subtitle">
                <span>Wind:</span>{weatherData.wind}
              </p>
              <div className="article__statistics">
                <div className="statistic_box">
                  <span className="number">{landingAttempts}</span>
                  <span className="label">Attempts landing</span>
                </div>
                <div className="statistic_box">
                  <span className="number">{landingSuccesses}</span>
                  <span className="label">Successful landing</span>
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
              <p className="article__text">{details}</p>
              {
                wikipedia ? (
                  <p className="article__social">
                    <a className="wiki_link" href={wikipedia} rel="nofollow" target="_blank">
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
              {
                launches && launches.length ? renderLaunches(launchesData) : (<p>There were no launches on the launchpad yet.</p>)
              }
            </div>
          </div>
        </div>
      </article >
    </>
  )
}

export default SingleLandpadLayout;