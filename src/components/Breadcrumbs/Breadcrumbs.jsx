import { Link, useNavigate } from 'react-router-dom';
// styles
import './breadcrumbs.scss';
//resources
import { ReactComponent as IconSvg } from '../../resources/icons/arrow-left.svg';

export const Breadcrumbs = ({ children }) => {
  return (
    <div className="breadcrumbs">
      <div className='container'>
        <div className="breadcrumbs__inner">
          {children}
        </div>
      </div>
    </div>
  )
}

export const ForvardLink = ({ label = 'Go back' }) => {
  const navigate = useNavigate();
  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  }
  return (
    <a href="/" onClick={handleGoBack} className='forward'>
      <IconSvg />
      {label}
    </a>
  )
}

export const CrumbLink = ({ label = 'Link', url = '#' }) => {
  return <Link to={url}>{label}</Link>
}

export const CrumbLabel = ({ label = "Label" }) => {
  return <span>{label}</span>
}

export const Divider = () => {
  return <span className='breadcrumbs__divider'></span>
}