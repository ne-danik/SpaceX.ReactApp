import { BrowserRouter } from 'react-router-dom';

import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';
import Router from '../../routes/Router';

const App = () => {
  return (
    <BrowserRouter>
      <AppHeader />
      <Router />
      <AppFooter />
    </BrowserRouter >
  )
}

export default App;