import './status.scss';

export const Status = ({ status = '', style = null }) => {
  switch (status) {
    case 'active':
    case 'true':
      return (
        <p className="status status_active" style={style}>Active</p>
      )
    case 'under construction':
      return (
        <p className="status status_under-construction" style={style}>Under Construction</p>
      )
    case 'retired':
      return (
        <p className="status status_retired" style={style}>Retired</p>
      )
    case 'false':
      return (
        <p className="status status_retired" style={style}>Inactive</p>
      )
    default:
      return (
        <p className="status" style={style}>{status}</p>
      )
  }
}