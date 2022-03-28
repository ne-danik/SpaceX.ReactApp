import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// components
import { Card, CardContent, CardTitle, CardMeta, CardImg } from '../Card/Card';
import Button from "../Button/Button";

const RocketsList = ({ data }) => {
  const [currentData, setCurrentData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(8);
  const [dataEnded, setDataEnded] = useState(false);

  useEffect(() => {
    onDataLoaded(data);
  }, [data])

  const onDataLoaded = (data) => {
    const currentSampling = data.slice(offset, offset + limit);

    setCurrentData(currentList => [...currentList, ...currentSampling]);
    setOffset(offset => offset + limit);

    let endedTrigger = false;
    if (currentSampling.length < limit || (currentData.length + currentSampling.length) === data.length) {
      endedTrigger = true;
    }

    setDataEnded(endedTrigger);
  }

  const renderCards = (data) => {
    const items = data.map((item) => {
      const { id, name, images, country } = item;
      return (
        <Link key={id} to={`/rockets/${id}`}>
          <Card variant='image' className='rockets'>
            <CardImg urlImage={images[1] || images[0]} altImage={name} />
            <CardContent>
              <CardTitle content={name} />
              <CardMeta content={country} />
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
    <section className="section">
      <div className="container">
        <h2 className="section__title">Rockets</h2>
        <div className="section__content">
          {renderCards(currentData)}
          {
            dataEnded ? null : <Button title="Show more" action={() => onDataLoaded(data)} isNone={dataEnded} />
          }
        </div>
      </div>
    </section>
  )
}


export default RocketsList;