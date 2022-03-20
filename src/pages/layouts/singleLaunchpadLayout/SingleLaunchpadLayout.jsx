import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// hooks
import useSpacexService from '../../../services/useSpacexService';
import useWeatherService from '../../../services/useWeatherService';
// styles
import './singleLaunchpadLayout.scss';

const SingleLaunchpadLayout = ({ data }) => {
  const [launchesData, setLaunchesData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [roketsData, setRocketsData] = useState([]);

  const { name, region, locality, latitude, longitude, details, status, launchAttempts, launchSuccesses, rockets, launches, image } = data;

  const { process, setProcess, clearError, getAllLaunches, getAllRockets } = useSpacexService();
  const { wtProcess, wtSetProcess, wtClearError, getWeather } = useWeatherService();

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

  const renderStatus = (status) => {
    const styleClass = status.replace(" ", "-");
    switch (status) {
      case 'active':
        return (
          <p className={`article__status article__status--${styleClass}`}>{status}</p>
        )
      case 'under construction':
        return (
          <p className={`article__status article__status--${styleClass}`}>{status}</p>
        )
      case 'retired':
        return (
          <p className={`article__status article__status--${styleClass}`}>{status}</p>
        )
      default:
        return (
          <p className="article__status">{status}</p>
        )
    }
  }

  const renderRockets = (data) => {
    return (
      data.map((item) => {
        const { id, name, images } = item;
        return (
          <Link key={id} to={`/rockets/${id}`} className="rocket-block">
            <img className="rocket-block__image" src={images[0]} alt={name} />
            <span className="rocket-block__title" >{name}</span>
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
            <span>Launchpad</span>
          </div>
        </div>
      </div>

      <article className="article">
        <div className="article__bg" style={{ backgroundImage: `url(${image})` }}>
          <div className="article__header">
            <div className="container">
              {status ? renderStatus(status) : null}
              <h2 className="article__title">{name}</h2>
              <p className="article__subtitle">
                <span>Region:</span>{region}
              </p>
              <p className="article__subtitle">
                <span>Locality:</span>
                <a className="external-link article__locate_link" href={`https://www.google.com/maps?ll=${latitude},${longitude}`} rel="nofollow" target="_blank">
                  {locality}
                  <svg className="external-link__icon" width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  <span className="number">{launchAttempts}</span>
                  <span className="label">Attempts launches</span>
                </div>
                <div className="statistic_box">
                  <span className="number">{launchSuccesses}</span>
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
              <p className="article__text">{details}</p>
            </div>
            <div className="text-block">
              <h3 className="h3 text-block__title">Rockets</h3>
              <p className="article__text">{rockets && rockets.length ? renderRockets(roketsData) : 'No rockets'}</p>
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

export default SingleLaunchpadLayout;