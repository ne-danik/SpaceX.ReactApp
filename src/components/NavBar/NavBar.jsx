import { NavLink } from "react-router-dom";
// styles
import './navBar.scss';
// resources
import { ReactComponent as CrewIcon } from "../../resources/images/captain.svg";
import { ReactComponent as StarlinkIcon } from "../../resources/images/sputnik.svg";
import { ReactComponent as DragonsIcon } from "../../resources/images/capsule.svg";
import { ReactComponent as RocketsIcon } from "../../resources/images/rocket.svg";
import { ReactComponent as ShipsIcon } from "../../resources/images/ship.svg";

const NavBar = () => {
  return (
    <div className="navbar">
      <NavLink className="navbar__link" to="/crew">
        <CrewIcon className="navbar__icon" />
        <span className="navbar__text">Crew</span>
      </NavLink>
      <NavLink className="navbar__link" to="/starlink">
        <StarlinkIcon className="navbar__icon" />
        <span className="navbar__text">Starlink</span>
      </NavLink>
      <NavLink className="navbar__link" to="/dragons">
        <DragonsIcon className="navbar__icon" />
        <span className="navbar__text">Dragons</span>
      </NavLink>
      <NavLink className="navbar__link" to="/rockets">
        <RocketsIcon className="navbar__icon" />
        <span className="navbar__text">Rockets</span>
      </NavLink>
      <NavLink className="navbar__link" to="/ships">
        <ShipsIcon className="navbar__icon" />
        <span className="navbar__text">Ships</span>
      </NavLink>
    </div>
  )
}

export default NavBar;