import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
// hooks
import useSpacexService from '../../services/useSpacexService';
// utils
import setContent from '../../utils/setContent';
// components
import { Skeleton } from '../Skeleton/Skeleton';
// style
import 'swiper/css';
import '../../style/slider.scss';

const Landpads = () => {
  const [landpadsList, setLandpadsList] = useState([]);
  const { process, setProcess, clearError, getAllLandpads } = useSpacexService();

  useEffect(() => {
    clearError();

    getAllLandpads()
      .then(setLandpadsList)
      .then(() => setProcess('success'))
  }, [])

  return (
    <section className="section landpads">
      <div className="container">
        <h2 className="section__title">Landpads</h2>
        <div className="section__content">
          {setContent(process, Slider, landpadsList, CardSkeleton)}
        </div>
      </div>
    </section>
  )
}

const Slider = ({ data }) => {
  const items = data.map((item) => {
    return (
      <SwiperSlide
        key={item.id}
        className="slide__wrapper">
        <div className="slide" data-id={item.id}>
          <Link to={`/landpads/${item.id}`} className="slide__link">
            <div className="slide__text-content">
              <p className="slide__title">{item.name}
                <svg className="slide__title-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.33334 5.33333C3.83487 5.33333 2.66668 6.50152 2.66668 8C2.66668 9.49848 3.83487 10.6667 5.33334 10.6667H6.66668C7.03487 10.6667 7.33334 10.9651 7.33334 11.3333C7.33334 11.7015 7.03487 12 6.66668 12H5.33334C3.09849 12 1.33334 10.2349 1.33334 8C1.33334 5.76514 3.09849 4 5.33334 4H6.66668C7.03487 4 7.33334 4.29848 7.33334 4.66667C7.33334 5.03486 7.03487 5.33333 6.66668 5.33333H5.33334ZM8.66668 4.66667C8.66668 4.29848 8.96515 4 9.33334 4H10.6667C12.9015 4 14.6667 5.76514 14.6667 8C14.6667 10.2349 12.9015 12 10.6667 12H9.33334C8.96515 12 8.66668 11.7015 8.66668 11.3333C8.66668 10.9651 8.96515 10.6667 9.33334 10.6667H10.6667C12.1652 10.6667 13.3333 9.49848 13.3333 8C13.3333 6.50152 12.1652 5.33333 10.6667 5.33333H9.33334C8.96515 5.33333 8.66668 5.03486 8.66668 4.66667ZM4.66668 8C4.66668 7.63181 4.96515 7.33333 5.33334 7.33333H10.6667C11.0349 7.33333 11.3333 7.63181 11.3333 8C11.3333 8.36819 11.0349 8.66667 10.6667 8.66667H5.33334C4.96515 8.66667 4.66668 8.36819 4.66668 8Z"
                    fill="#0044FF" />
                </svg>
              </p>
              <p className="slide__meta">{item.region}</p>
              <p className="slide__desc">{item.details}</p>
            </div>
            <div className="slide__image">
              <img src={item.image} alt={item.name} />
            </div>
          </Link>
        </div>
      </SwiperSlide>
    )
  })
  return (
    <Swiper
      className="slider"
      spaceBetween={20}
      breakpoints={{
        320: {
          slidesPerView: "auto"
        },
        1240: {
          slidesPerView: 2
        }
      }}
    >
      {items}
    </Swiper>
  )
}

const CardSkeleton = () => {
  return (
    <div className="slider" style={{ display: 'flex' }}>
      <div className="slide__wrapper" style={{ marginRight: '20px' }}>
        <div className="slide">
          <div className="slide__link">
            <div className="slide__text-content">
              <p className="slide__title"><Skeleton width="80%" /></p>
              <p className="slide__meta"><Skeleton width="20%" /></p>
              <p className="slide__desc">
                <Skeleton />
                <Skeleton />
                <Skeleton width="80%" />
              </p>
            </div>
            <div className="slide__image">
              <Skeleton height="100%" />
            </div>
          </div>
        </div>
      </div>
      <div className="slide__wrapper">
        <div className="slide">
          <div className="slide__link">
            <div className="slide__text-content">
              <p className="slide__title"><Skeleton width="80%" /></p>
              <p className="slide__meta"><Skeleton width="20%" /></p>
              <p className="slide__desc">
                <Skeleton />
                <Skeleton />
                <Skeleton width="40%" />
              </p>
            </div>
            <div className="slide__image">
              <Skeleton height="100%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landpads;