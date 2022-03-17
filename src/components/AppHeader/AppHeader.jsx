// components
import HamburgerButton from '../HamburgerButton/HamburgerButton';
import NavBar from '../NavBar/NavBar';
import SideMenu from '../SideMenu/SideMenu';
// styles
import './appHeader.scss';
import logo from '../../resources/images/logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  const [isMenuOpen, toggleMenuMode] = useState(false);

  const onToggleMenu = (state) => {
    toggleMenuMode(state);
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">

          <HamburgerButton isMenuOpen={isMenuOpen} onToggleMenu={onToggleMenu} />

          <div className="logo">
            <div className="logo__link">
              <Link to='/'>
                <img className="logo__img" src={logo} alt="Logotype SpaceX Company" />
              </Link>
              <a className="logo__text-block" href="https://www.spacex.com/" target="_blank">
                <h1 className="logo__text">SpaceX<span>.com</span></h1>
                <svg className="logo__text__icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.33333 3.33333C8.96514 3.33333 8.66667 3.03486 8.66667 2.66667C8.66667 2.29848 8.96514 2 9.33333 2H13.3333C13.5101 2 13.6797 2.07024 13.8047 2.19526C13.9298 2.32029 14 2.48986 14 2.66667L14 6.66667C14 7.03486 13.7015 7.33333 13.3333 7.33333C12.9651 7.33333 12.6667 7.03486 12.6667 6.66667L12.6667 4.27614L6.4714 10.4714C6.21106 10.7318 5.78894 10.7318 5.5286 10.4714C5.26825 10.2111 5.26825 9.78894 5.5286 9.52859L11.7239 3.33333H9.33333ZM2 4.66667C2 3.93029 2.59695 3.33333 3.33333 3.33333H6.66667C7.03486 3.33333 7.33333 3.63181 7.33333 4C7.33333 4.36819 7.03486 4.66667 6.66667 4.66667H3.33333V12.6667H11.3333V9.33333C11.3333 8.96514 11.6318 8.66667 12 8.66667C12.3682 8.66667 12.6667 8.96514 12.6667 9.33333V12.6667C12.6667 13.403 12.0697 14 11.3333 14H3.33333C2.59695 14 2 13.403 2 12.6667V4.66667Z"
                    fill="#0044FF" />
                </svg>
              </a>
            </div>
          </div>

          <NavBar />
          <SideMenu open={isMenuOpen} onToggleMenu={onToggleMenu} />
        </div>
      </div>
    </header >
  )
}

export default AppHeader