import './skeleton.scss';

const Skeleton = ({ width = '100%', height = '10px' }) => {
  return (
    <span className="skeleton" style={{ width: `${width}`, height: `${height}` }}></span>
  )
}

export { Skeleton };