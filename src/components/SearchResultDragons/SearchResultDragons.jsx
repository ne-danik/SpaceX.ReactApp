import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// components
import Button from "../Button/Button";
import { Card, CardContent, CardTitle, CardMeta, CardImg } from '../Card/Card';

const SearchResultDragons = ({ data, searchValue }) => {
  const [currentData, setCurrentData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(8);
  const [dataEnded, setdataEnded] = useState(false);
  const [countResults, setCountResults] = useState(0);

  useEffect(() => {
    setCurrentData([]);
    setCountResults(data.length);
    setOffset(0);
    onCurrentDataLoaded(data, 0)
  }, [searchValue])

  const onCurrentDataLoaded = (data, offset) => {
    const currentSampling = data.slice(offset, offset + limit);

    setCurrentData(currentData => [...currentData, ...currentSampling]);
    setOffset(offset => offset + limit);

    let endedTrigger = false;
    if (currentSampling.length < limit || (currentData.length + currentSampling.length) === data.length) {
      endedTrigger = true;
    }
    setdataEnded(endedTrigger);
  }

  const onLoadMore = (offset) => {
    onCurrentDataLoaded(data, offset);
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="section__title">Results by Dragons</h2>
        <p className="section__subtitle">Found {countResults} matches</p>
        <div className="section__content">
          <Results currentData={currentData} searchValue={searchValue} />
          {
            dataEnded ? null : <Button title="Load more" action={() => onLoadMore(offset)} isNone={dataEnded} />
          }
        </div>
      </div>
    </section>
  )
}

const Results = ({ currentData, searchValue }) => {
  const elements = currentData.map((item) => {
    const { id, name, images, type } = item;
    return (
      <Link key={id} to={`/dragons/${id}`}>
        <Card variant='image' className='dragons'>
          <CardImg urlImage={images[0]} altImage={name} />
          <CardContent>
            <CardTitle content={name} />
            <CardMeta content={type} />
          </CardContent>
        </Card>
      </Link>
    )
  });
  return (
    <>
      {elements.length > 0 ? (
        <div className="cards">
          {elements}
        </div>
      ) : (
        <>
          No results found for <strong>{searchValue}</strong>
        </>
      )}
    </>
  )
}

export default SearchResultDragons;