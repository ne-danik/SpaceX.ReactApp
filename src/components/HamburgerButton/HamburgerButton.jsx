import { useContext } from 'react';
// context
import { MenuContext } from '../../context/menuState';
// styles
import './hamburgerButton.scss';

const HamburgerButton = () => {
  const { isMenuOpen, onToggleMenu } = useContext(MenuContext);
  
  return (
    <button
      onClick={onToggleMenu}
      className={'burger' + (isMenuOpen ? ' active' : '')}
      aria-label="Open menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}

export default HamburgerButton;