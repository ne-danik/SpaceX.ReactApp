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

import MainPageLayout from '../../pages/layouts/mainPageLayout/MainPageLayout';

const MainPage = lazy(() => import('../../pages/MainPage'));
const AboutPage = lazy(() => import('../../pages/aboutPage/AboutPage'));
const HistoryPage = lazy(() => import('../../pages/HistoryPage'));
const SinglePage = lazy(() => import('../../pages/SinglePage'));
const CrewPage = lazy(() => import('../../pages/crewPage/CrewPage'));
const StarlinkPage = lazy(() => import('../../pages/StarlinkPage'));
const DragonsPage = lazy(() => import('../../pages/DragonsPage'));
const RocketsPage = lazy(() => import('../../pages/RocketsPage'));
const ShipsPage = lazy(() => import('../../pages/ShipsPage'));
const NotFoundPage = lazy(() => import('../../pages/notFoundPage/NotFoundPage'));

const App = () => {
  return (
    <Router>
      <AppHeader />

      <Routes>
        <Route path='/' element={<MainPageLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<Spinner />}>
                <MainPage />
              </Suspense>
            }
          />
          <Route
            path='crew'
            element={
              <Suspense fallback={<Spinner />}>
                <CrewPage />
              </Suspense>
            }
          />
          <Route path='starlink' element={
            <Suspense fallback={<Spinner />}>
              <StarlinkPage />
            </Suspense>
          }
          />
          <Route path='dragons' element={
            <Suspense fallback={<Spinner />}>
              <DragonsPage />
            </Suspense>
          }
          />
          <Route path='rockets' element={
            <Suspense fallback={<Spinner />}>
              <RocketsPage />
            </Suspense>
          }
          />
          <Route path='ships' element={
            <Suspense fallback={<Spinner />}>
              <ShipsPage />
            </Suspense>
          }
          />
        </Route>

        <Route
          path='/about'
          element={
            <Suspense fallback={<Spinner />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path='/history'
          element={
            <Suspense fallback={<Spinner />}>
              <HistoryPage />
            </Suspense>
          }
        />

        <Route
          path='/launches/:id'
          element={
            <Suspense fallback={<Spinner />}>
              <SinglePage Component={SingleLaunchLayout} dataType='launch' />
            </Suspense>
          } />
        <Route
          path='/launchpads/:id'
          element={
            <Suspense fallback={<Spinner />}>
              <SinglePage Component={SingleLaunchpadLayout} dataType='launchpad' />
            </Suspense>
          } />
        <Route
          path='/landpads/:id'
          element={
            <Suspense fallback={<Spinner />}>
              <SinglePage Component={SingleLandpadLayout} dataType='landpad' />
            </Suspense>
          } />
        <Route
          path='/crew/:id'
          element={
            <Suspense fallback={<Spinner />}>
              <SinglePage Component={SingleCrewLayout} dataType='crew' />
            </Suspense>
          } />
        <Route
          path='/starlink/:id'
          element={
            <Suspense fallback={<Spinner />}>
              <SinglePage Component={SingleStarlinkLayout} dataType='starlink' />
            </Suspense>
          } />
        <Route
          path='/dragons/:id'
          element={
            <Suspense fallback={<Spinner />}>
              <SinglePage Component={SingleDragonLayout} dataType='dragon' />
            </Suspense>
          } />
        <Route
          path='/rockets/:id'
          element={
            <Suspense fallback={<Spinner />}>
              <SinglePage Component={SingleRocketLayout} dataType='rocket' />
            </Suspense>
          } />
        <Route
          path='/ships/:id'
          element={
            <Suspense fallback={<Spinner />}>
              <SinglePage Component={SingleShipLayout} dataType='ship' />
            </Suspense>
          } />

        <Route
          path='*'
          element={
            <Suspense fallback={<Spinner />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>

      <AppFooter />
    </Router >
  )
}

export default App;