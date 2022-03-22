// styles
import './card.scss';
// resources
import { ReactComponent as LinkIcon } from '../../resources/icons/link.svg';

export const Card = ({ children, variant }) => {
  switch (variant) {
    case 'text-image':
      return (
        <div className="card card_text_image">
          {children}
        </div>
      )
    case 'image':
      return (
        <div className="card card_image">
          {children}
        </div>
      )
    default:
      return (
        <div className="card">
          {children}
        </div>
      )
  }
}

export const CardContent = ({ children }) => {
  return (
    <div className="card__content">
      {children}
    </div>
  )
}

export const CardTitle = ({ content, noLinkIcon = false }) => {
  return (
    <p className="card__title">
      {content}
      {noLinkIcon ? null : (
        <span className="card__title-icon">
          <LinkIcon />
        </span>
      )}
    </p>
  )
}

export const CardMeta = ({ content }) => {
  return (
    <p className="card__meta">
      {content}
    </p>
  )
}

export const CardDesc = ({ content }) => {
  return (
    <p className="card__desc">
      {content}
    </p>
  )
}

export const CardImg = ({ content = null, urlImage, altImage, style = null }) => {
  return (
    <div className="card__image">
      {content ? (
        content
      ) : (
        <img src={urlImage} alt={altImage} className="card__img" style={style} />
      )}
    </div>
  )
}


