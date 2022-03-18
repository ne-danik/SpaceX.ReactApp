import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// styles
import './mobileMenu.scss';

const MobileMenu = (props) => {

  useEffect(() => {
    renderMobileMenu();
  }, [props.open])

  const renderMobileMenu = () => {
    return (
      <div className={'side-menu_overlay' + (props.open ? ' open' : '')} >
        <nav className="side-menu">
          <ul className="side-nav__list">
            <li className="side-nav__item">
              <NavLink
                end
                to="/"
                onClick={() => props.onToggleMenu(!props.open)}
                className={({ isActive }) => ("side-nav__link" + (isActive ? " active" : ""))}
              >
                Home
              </NavLink>
            </li>
            <li className="side-nav__item">
              <NavLink
                end
                to="/about"
                onClick={() => props.onToggleMenu(!props.open)}
                className={({ isActive }) => ("side-nav__link" + (isActive ? " active" : ""))}
              >
                About
              </NavLink>
            </li>
            <li className="side-nav__item">
              <NavLink
                end
                to="/history"
                onClick={() => props.onToggleMenu(!props.open)}
                className={({ isActive }) => ("side-nav__link" + (isActive ? " active" : ""))}
              >
                History
              </NavLink>
            </li>
          </ul>
        </nav>
      </div >
    )
  }

  return (
    <>
      {renderMobileMenu()}
    </>
  )
}

MobileMenu.propTypes = {
  open: PropTypes.bool,
  onToggleMenu: PropTypes.func
}

export default MobileMenu;