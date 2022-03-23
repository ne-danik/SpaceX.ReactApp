// context
import MenuState from '../../context/menuState';
// components
import HamburgerButton from '../HamburgerButton/HamburgerButton';
import Logo from '../Logo/Logo';
import MainMenu from '../MainMenu/MainMenu';
import MobileMenu from '../MobileMenu/MobileMenu';
// styles
import './appHeader.scss';

const AppHeader = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Logo />
          <MenuState>
            <MainMenu />
            <HamburgerButton />
            <MobileMenu />
          </MenuState>
        </div>
      </div>
    </header >
  )
}

export default AppHeader