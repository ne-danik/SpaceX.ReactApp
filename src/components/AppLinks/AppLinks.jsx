import { ReactComponent as ExternalIcon } from '../../resources/icons/external-link.svg';
import { ReactComponent as InternalIcon } from '../../resources/icons/link.svg';
// styles
import './appLinks.scss';

export const ExternalLink = ({ url = '#', label = 'link', className, iconWidth = '16px', iconHeight = '16px' }) => {
  return (
    <a className={`external__link ${className}`} href={url} target="_blank" rel="nofollow noopener noreferrer">
      {label}
      <ExternalIcon className="external__icon" style={{ width: iconWidth, height: iconHeight }} />
    </a>
  )
}

export const InternalLink = ({ url = '#', label = 'link', className, iconWidth = '16px', iconHeight = '16px' }) => {
  return (
    <a className={`internal__link ${className}`} href={url}>
      {label}
      <InternalIcon className="internal__icon" style={{ width: iconWidth, height: iconHeight }} />
    </a>
  )
}