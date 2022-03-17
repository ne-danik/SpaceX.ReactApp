import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useSpacexService from '../services/useSpacexService';
import setContent from '../utils/setContent';

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { process, setProcess, clearError, getOneLaunch, getOneLaunchpad, getOneLandpad } = useSpacexService();
 
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