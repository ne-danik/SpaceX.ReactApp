import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Spinner from '../Spinner/Spinner';
import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';

import SingleLaunchLayout from '../../pages/layouts/singleLaunchLayout/SingleLaunchLayout';
import SingleLaunchpadLayout from '../../pages/layouts/singleLaunchpadLayout/SingleLaunchpadLayout';
import SingleLandpadLayout from '../../pages/layouts/singleLandpadLayout/SingleLandpadLayout';
import SingleCrewLayout from '../../pages/layouts/singleCrewLayout/SingleCrewLayout';
import SingleStarlinkLayout from '../../pages/layouts/singleStarlinkLayout/SingleStarlinkLayout';
import SingleDragonLayout from '../../pages/layouts/singleDragonLayout/SingleDragonLayout';
import SingleRocketLayout from '../../pages/layouts/singleRocketLayout/SingleRocketLayout';
import SingleShipLayout from '../../pages/layouts/singleShipLayout/SingleShipLayout';

const MainPageLayout = lazy(() => import('../../pages/layouts/mainPageLayout/MainPageLayout'));
const MainPage = lazy(() => import('../../pages/MainPage'));
const AboutPage = lazy(() => import('../../pages/AboutPage'));
const HistoryPage = lazy(() => import('../../pages/HistoryPage'));
const SinglePage = lazy(() => import('../../pages/SinglePage'));
const CrewPage = lazy(() => import('../../pages/CrewPage'));
const StarlinkPage = lazy(() => import('../../pages/StarlinkPage'));
const DragonsPage = lazy(() => import('../../pages/DragonsPage'));
const RocketsPage = lazy(() => import('../../pages/RocketsPage'));
const ShipsPage = lazy(() => import('../../pages/ShipsPage'));

const App = () => {
  return (
    <Router>
      <AppHeader />

      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<MainPageLayout />}>
            <Route index element={<MainPage />} />
            <Route path='crew' element={<CrewPage />} />
            <Route path='starlink' element={<StarlinkPage />} />
            <Route path='dragons' element={<DragonsPage />} />
            <Route path='rockets' element={<RocketsPage />} />
            <Route path='ships' element={<ShipsPage />} />
          </Route>

          <Route path='/about' element={<AboutPage />} />
          <Route path='/history' element={<HistoryPage />} />

          <Route
            path='/launches/:id'
            element={<SinglePage Component={SingleLaunchLayout} dataType='launch' />} />
          <Route
            path='/launchpads/:id'
            element={<SinglePage Component={SingleLaunchpadLayout} dataType='launchpad' />} />
          <Route
            path='/landpads/:id'
            element={<SinglePage Component={SingleLandpadLayout} dataType='landpad' />} />
          <Route
            path='/crew/:id'
            element={<SinglePage Component={SingleCrewLayout} dataType='crew' />} />
          <Route
            path='/starlink/:id'
            element={<SinglePage Component={SingleStarlinkLayout} dataType='starlink' />} />
          <Route
            path='/dragons/:id'
            element={<SinglePage Component={SingleDragonLayout} dataType='dragon' />} />
          <Route
            path='/rockets/:id'
            element={<SinglePage Component={SingleRocketLayout} dataType='rocket' />} />
          <Route
            path='/ships/:id'
            element={<SinglePage Component={SingleShipLayout} dataType='ship' />} />
        </Routes>
      </Suspense>

      <AppFooter />
    </Router>
  )
}

export default App