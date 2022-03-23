import { useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
// context
import { MenuContext } from '../../context/menuState';
// styles
import './mobileMenu.scss';

const menuLinks = [
  { name: 'Home', url: '' },
  { name: 'About', url: 'about' },
  { name: 'History', url: 'history' },
]

const MobileMenu = () => {
  const { isMenuOpen, onToggleMenu } = useContext(MenuContext);

  console.log()

  useEffect(() => {
    renderMobileMenu();
  }, [isMenuOpen])

  const renderMobileMenu = () => {
    const linksElements = menuLinks.map((link, idx) => {
      return (
        <li key={idx} className="side-nav__item">
          <NavLink
            to={`/${link.url}`}
            onClick={isMenuOpen ? onToggleMenu : null}
            className={({ isActive }) => ("side-nav__link" + (isActive ? " active" : ""))}
          >
            {link.name}
          </NavLink>
        </li>
      )
    })
    return (
      <div className={'side-menu_overlay' + (isMenuOpen ? ' open' : '')} >
        <nav className="side-menu">
          <ul className="side-nav__list">
            {linksElements}
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

export default MobileMenu;