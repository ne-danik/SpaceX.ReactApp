import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';
// single pages
import SingleCrewPage from '../../pages/singlePages/singleCrewPage/SingleCrewPage';
import SingleLaunchPage from '../../pages/singlePages/singleLaunchPage/SingleLaunchPage';
import SingleLaunchpadPage from '../../pages/singlePages/singleLaunchpadPage/SingleLaunchpadPage';
import SingleLandpadPage from '../../pages/singlePages/singleLandpadPage/SingleLandpadPage';
import SingleStarlinkPage from '../../pages/singlePages/singleStarlinkPage/SingleStarlinkPage';
import SingleDragonPage from '../../pages/singlePages/singleDragonPage/SingleDragonPage';
import SingleRocketPage from '../../pages/singlePages/singleRocketPage/SingleRocketPage';
import SingleShipPage from '../../pages/singlePages/singleShipPage/SingleShipPage';

import MainPageLayout from '../../pages/layouts/MainPageLayout';
// categories layouts
import CrewPageLayout from '../../pages/layouts/CrewPageLayout';
import StarlinkPageLayout from '../../pages/layouts/StarlinkPageLayout';
import DragonsPageLayout from '../../pages/layouts/DragonsPageLayout';
import RocketsPageLayout from '../../pages/layouts/RocketsPageLayout';
import ShipsPageLayout from '../../pages/layouts/ShipsPageLayout';

import CategoryPage from '../../pages/CategoryPage';
import SinglePage from '../../pages/SinglePage';

import MainPage from '../../pages/MainPage';
import AboutPage from '../../pages/aboutPage/AboutPage';
import HistoryPage from '../../pages/HistoryPage';
import CrewPage from '../../pages/crewPage/CrewPage';
import StarlinkPage from '../../pages/StarlinkPage';
import DragonsPage from '../../pages/DragonsPage';
import RocketsPage from '../../pages/RocketsPage';
import ShipsPage from '../../pages/ShipsPage';
import NotFoundPage from '../../pages/notFoundPage/NotFoundPage';

const App = () => {
  return (
    <Router>
      <AppHeader />

      <Routes>
        <Route path='/' element={<MainPageLayout />}>
          <Route index element={<MainPage />} />

          <Route path='crew' element={<CrewPageLayout />}>
            <Route index element={<CategoryPage Component={CrewPage} dataType='crew' />} />
            <Route path=':id' element={<SinglePage Component={SingleCrewPage} dataType='crew' />} />
          </Route>

          <Route path='starlink' element={<StarlinkPageLayout />}>
            <Route index element={<CategoryPage Component={StarlinkPage} dataType='starlink' />} />
            <Route path=':id' element={<SinglePage Component={SingleStarlinkPage} dataType='starlink' />} />
          </Route>

          <Route path='dragons' element={<DragonsPageLayout />}>
            <Route index element={<CategoryPage Component={DragonsPage} dataType='dragons' />} />
            <Route path=':id' element={<SinglePage Component={SingleDragonPage} dataType='dragon' />} />
          </Route>

          <Route path='rockets' element={<RocketsPageLayout />}>
            <Route index element={<CategoryPage Component={RocketsPage} dataType='rockets' />} />
            <Route path=':id' element={<SinglePage Component={SingleRocketPage} dataType='rocket' />} />
          </Route>

          <Route path='ships' element={<ShipsPageLayout />}>
            <Route index element={<CategoryPage Component={ShipsPage} dataType='ships' />} />
            <Route path=':id' element={<SinglePage Component={SingleShipPage} dataType='ship' />} />
          </Route>

          <Route path='/launches/:id' element={<SinglePage Component={SingleLaunchPage} dataType='launch' />} />
          <Route path='/launchpads/:id' element={<SinglePage Component={SingleLaunchpadPage} dataType='launchpad' />} />
          <Route path='/landpads/:id' element={<SinglePage Component={SingleLandpadPage} dataType='landpad' />} />
        </Route>

        <Route path='/about' element={<AboutPage />} />
        <Route path='/history' element={<HistoryPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes >

      <AppFooter />
    </Router >
  )
}

export default App;