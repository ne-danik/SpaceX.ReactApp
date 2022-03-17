import PropTypes from 'prop-types';
// styles
import './hamburgerButton.scss';

const HamburgerButton = (props) => {
  return (
    <button
      onClick={() => props.onToggleMenu(!props.isMenuOpen)}
      className={'burger' + (props.isMenuOpen ? ' active' : '')}
      aria-label="Открыть главное меню"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}

HamburgerButton.propTypes = {
  onToggleMenu: PropTypes.func,
  isMenuOpen: PropTypes.bool
}

export default HamburgerButton;