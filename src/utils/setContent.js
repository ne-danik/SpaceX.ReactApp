import Spinner from '../components/Spinner/Spinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const setContent = (process, Component, data) => {
  switch (process) {
    case 'waiting':
      return <Spinner/>
    case 'loading':
      return <Spinner/>
    case 'success':
      return <Component data={data}/>
    case 'failure':
      return <ErrorMessage/>
    default:
      throw new Error('Unexpected process state');
  }
}

export default setContent;