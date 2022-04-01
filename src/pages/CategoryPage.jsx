import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
//services
import useSpacexService from '../services/spasexService';
// utils
import setContent from '../utils/setContent';

const CategoryPage = ({ Component, dataType }) => {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const { process, setProcess, clearError, getAllLaunches, getAllCrewMembers, getAllDragons, getAllRockets, getAllShips, getAllStarlink, } = useSpacexService();

  useEffect(() => {
    updateData()
  }, [category])

  const updateData = () => {
    clearError();

    switch (dataType) {
      case 'launches':
        getAllLaunches().then(onDataLoaded).then(() => setProcess('success'));
        break;
      case 'crew':
        getAllCrewMembers().then(onDataLoaded).then(() => setProcess('success'));
        break;
      case 'starlink':
        getAllStarlink().then(onDataLoaded).then(() => setProcess('success'));
        break;
      case 'dragons':
        getAllDragons().then(onDataLoaded).then(() => setProcess('success'));
        break;
      case 'rockets':
        getAllRockets().then(onDataLoaded).then(() => setProcess('success'));
        break;
      case 'ships':
        getAllShips().then(onDataLoaded).then(() => setProcess('success'));
        break;
      default:
        return;
    }
  }

  const onDataLoaded = (data) => {
    setData(data);
  }

  return (
    <>
      {setContent(process, Component, data)}
    </>
  )
}

export default CategoryPage;