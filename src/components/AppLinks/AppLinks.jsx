import { ReactComponent as ExternalIcon } from '../../resources/icons/external-link.svg';
import { ReactComponent as InternalIcon } from '../../resources/icons/link.svg';
// styles
import './appLinks.scss';

export const ExternalLink = ({ url = '#', label = 'link', className, iconWidth = '16px', iconHeight = '16px' }) => {
  return (
    <a className={className ? className : 'external__link'} href={url} target="_blank" rel="nofollow noopener noreferrer">
      {label}
      <ExternalIcon className="external__icon" style={{ width: iconWidth, height: iconHeight }} />
    </a>
  )
}

export const InternalLink = ({ url = '#', label = 'link', className, iconWidth = '16px', iconHeight = '16px' }) => {
  return (
    <a className={className ? className : 'internal__link'} href={url}>
      {label}
      <InternalIcon className="internal__icon" style={{ width: iconWidth, height: iconHeight }} />
    </a>
  )
}