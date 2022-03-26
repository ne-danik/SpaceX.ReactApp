import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
//services
import useSpacexService from '../services/useSpacexService';
// utils
import setContent from '../utils/setContent';

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { process, setProcess, clearError, getOneLaunch, getOneLaunchpad, getOneLandpad, getOneCrewMember, getOneStarlink, getOneDragon, getOneRocket, getOneShip, } = useSpacexService();

  useEffect(() => {
    updateData()
  }, [id])

  const updateData = () => {
    clearError();

    switch (dataType) {
      case 'launch':
        getOneLaunch(id).then(onDataLoaded).then(() => setProcess('success'));
        break;
      case 'launchpad':
        getOneLaunchpad(id).then(onDataLoaded).then(() => setProcess('success'));
        break;
      case 'landpad':
        getOneLandpad(id).then(onDataLoaded).then(() => setProcess('success'));
        break;
      case 'crew':
        getOneCrewMember(id).then(onDataLoaded).then(() => setProcess('success'));
        break;
      case 'starlink':
        getOneStarlink(id).then(onDataLoaded).then(() => setProcess('success'));
        break;
      case 'dragon':
        getOneDragon(id).then(onDataLoaded).then(() => setProcess('success'));
        break;
      case 'rocket':
        getOneRocket(id).then(onDataLoaded).then(() => setProcess('success'));
        break;
      case 'ship':
        getOneShip(id).then(onDataLoaded).then(() => setProcess('success'));
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

export default SinglePage;