import './status.scss';

export const Status = ({ status = '', style = null }) => {
  const styleClass = status.replace(" ", "-");
  switch (status) {
    case 'active':
      return (
        <p className={`status status_${styleClass}`} style={style}>{status}</p>
      )
    case 'under construction':
      return (
        <p className={`status status_${styleClass}`} style={style}>{status}</p>
      )
    case 'retired':
      return (
        <p className={`status status_${styleClass}`} style={style}>{status}</p>
      )
    default:
      return (
        <p className="status" style={style}>{status}</p>
      )
  }
}