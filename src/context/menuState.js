import {useState, createContext} from 'react';
import PropTypes from 'prop-types';

export const MenuContext = createContext({
  isMenuOpen: false,
  toggleMenu: () => { },
});

const MenuState = ({children}) => {
  const [isMenuOpen, toggleMenu] = useState(false);

  const onToggleMenu = () => {
    toggleMenu(!isMenuOpen);
  };

  return (
    <MenuContext.Provider value={{ isMenuOpen, onToggleMenu }}>{children}</MenuContext.Provider>
  );
}

MenuState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MenuState;