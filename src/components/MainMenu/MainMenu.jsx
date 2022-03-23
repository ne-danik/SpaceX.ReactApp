import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// context
import { MenuContext } from '../../context/menuState';
// styles
import './mainMenu.scss';

const menuLinks = [
  { name: 'Home', url: '' },
  { name: 'About', url: 'about' },
  { name: 'History', url: 'history' },
]

const NavBar = () => {
  const { isMenuOpen, onToggleMenu } = useContext(MenuContext);
  const isLocSearch = useLocation().search;

  const linksElements = menuLinks.map((link, idx) => {
    return (
      <li key={idx} className="nav__item">
        <NavLink
          to={`/${link.url}`}
          onClick={isMenuOpen ? onToggleMenu : null}
          className={({ isActive }) => ("nav__link" + (isActive && !isLocSearch ? " active" : ""))}
        >
          {link.name}
        </NavLink>
      </li>
    )
  })

  return (
    <div className="menu">
      <nav className="menu__nav nav">
        <ul className="nav__list">
          {linksElements}
        </ul>
      </nav>
    </div>
  )
}

export default NavBar;