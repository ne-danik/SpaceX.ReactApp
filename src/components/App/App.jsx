import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';

import SingleCrewLayout from '../../pages/layouts/single/singleCrewLayout/SingleCrewLayout';
import SingleLaunchLayout from '../../pages/layouts/single/singleLaunchLayout/SingleLaunchLayout';
import SingleLaunchpadLayout from '../../pages/layouts/single/singleLaunchpadLayout/SingleLaunchpadLayout';
import SingleLandpadLayout from '../../pages/layouts/single/singleLandpadLayout/SingleLandpadLayout';
import SingleStarlinkLayout from '../../pages/layouts/single/singleStarlinkLayout/SingleStarlinkLayout';
import SingleDragonLayout from '../../pages/layouts/single/singleDragonLayout/SingleDragonLayout';
import SingleRocketLayout from '../../pages/layouts/single/singleRocketLayout/SingleRocketLayout';
import SingleShipLayout from '../../pages/layouts/single/singleShipLayout/SingleShipLayout';

import MainPageLayout from '../../pages/layouts/MainPageLayout';
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
import StarlinkPage from '../../pages/starlinkPage/StarlinkPage';
import DragonsPage from '../../pages/dragonsPage/DragonsPage';
import RocketsPage from '../../pages/rocketsPage/RocketsPage';
import ShipsPage from '../../pages/shipsPage/ShipsPage';
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
            <Route path=':id' element={<SinglePage Component={SingleCrewLayout} dataType='crew' />} />
          </Route>

          <Route path='starlink' element={<StarlinkPageLayout />}>
            <Route index element={<CategoryPage Component={StarlinkPage} dataType='starlink' />} />
            <Route path=':id' element={<SinglePage Component={SingleStarlinkLayout} dataType='starlink' />} />
          </Route>

          <Route path='dragons' element={<DragonsPageLayout />}>
            <Route index element={<CategoryPage Component={DragonsPage} dataType='dragons' />} />
            <Route path=':id' element={<SinglePage Component={SingleDragonLayout} dataType='dragon' />} />
          </Route>

          <Route path='rockets' element={<RocketsPageLayout />}>
            <Route index element={<CategoryPage Component={RocketsPage} dataType='rockets' />} />
            <Route path=':id' element={<SinglePage Component={SingleRocketLayout} dataType='rocket' />} />
          </Route>

          <Route path='ships' element={<ShipsPageLayout />}>
            <Route index element={<CategoryPage Component={ShipsPage} dataType='ships' />} />
            <Route path=':id' element={<SinglePage Component={SingleShipLayout} dataType='ship' />} />
          </Route>
        </Route>

        <Route path='/about' element={<AboutPage />} />
        <Route path='/history' element={<HistoryPage />} />

        <Route path='/launches/:id' element={<SinglePage Component={SingleLaunchLayout} dataType='launch' />} />
        <Route path='/launchpads/:id' element={<SinglePage Component={SingleLaunchpadLayout} dataType='launchpad' />} />
        <Route path='/landpads/:id' element={<SinglePage Component={SingleLandpadLayout} dataType='landpad' />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes >

      <AppFooter />
    </Router >
  )
}

export default App;