import { NavLink } from 'react-router-dom';
// styles
import './navBar.scss';

const NavBar = () => {
  return (
    <div className="menu">
      <nav className="menu__nav nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              end
              to="/"
              className={({ isActive }) => ("nav__link" + (isActive ? " active" : ""))}
            >
              Home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              end
              to="/about"
              className={({ isActive }) => ("nav__link" + (isActive ? " active" : ""))}
            >
              About
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              end
              to="/history"
              className={({ isActive }) => ("nav__link" + (isActive ? " active" : ""))}
            >
              History
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar;