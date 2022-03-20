import Spinner from '../components/Spinner/Spinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const setContent = (process, Component, data, Skeleton, loadingMore = false) => {
  switch (process) {
    case 'waiting':
      return Skeleton ? <Skeleton /> : <Spinner />
    case 'loading':
      return loadingMore ? <Component data={data}/> : Skeleton ? <Skeleton /> : <Spinner />
    case 'success':
      return <Component data={data}/>
    case 'failure':
      return <ErrorMessage/>
    default:
      throw new Error('Unexpected process state');
  }
}

export default setContent;