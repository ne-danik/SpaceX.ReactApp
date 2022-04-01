import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
// hooks
import useSpacexService from '../../services/spasexService';
// utils
import setContent from '../../utils/setContent';
// components
import { Card, CardContent, CardTitle, CardMeta, CardImg, CardDesc } from '../Card/Card';
import { Skeleton } from '../Skeleton/Skeleton';
// styles
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
    const { id, region, name, details, image } = item;
    return (
      <SwiperSlide key={id} className="slide__wrapper">
        <Link to={`/landpads/${id}`}>
          <Card variant='text-image'>
            <CardContent>
              <CardTitle content={name} />
              <CardMeta content={region} />
              <CardDesc content={details} />
            </CardContent>
            <CardImg urlImage={image} altImage={name} />
          </Card>
        </Link>
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
    <div style={{ display: 'flex' }}>
      <div style={{ flexBasis: '100%', marginRight: '20px' }}>
        <Card variant='text-image'>
          <CardContent>
            <CardTitle content={<Skeleton width="80%" />} noLinkIcon />
            <CardMeta content={<Skeleton width="20%" />} />
            <CardDesc content={
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton width="80%" />
              </>
            } />
          </CardContent>
          <CardImg content={<Skeleton height="100%" />} />
        </Card>
      </div>
      <div style={{ flexBasis: '100%' }}>
        <Card variant='text-image'>
          <CardContent>
            <CardTitle content={<Skeleton width="80%" />} noLinkIcon />
            <CardMeta content={<Skeleton width="20%" />} />
            <CardDesc content={
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton width="80%" />
              </>
            } />
          </CardContent>
          <CardImg content={<Skeleton height="100%" />} />
        </Card>
      </div>
    </div >
  )
}

export default Landpads;