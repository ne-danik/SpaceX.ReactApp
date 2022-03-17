import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Spinner from '../Spinner/Spinner';
import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';
import SingleLaunchLayout from '../../pages/singleLaunchLayout/SingleLaunchLayout';
import SingleLaunchpadLayout from '../../pages/singleLaunchpadLayout/SingleLaunchpadLayout';
import SingleLandpadLayout from '../../pages/singleLandpadLayout/SingleLandpadLayout';

const MainPage = lazy(() => import('../../pages/MainPage'));
const AboutPage = lazy(() => import('../../pages/AboutPage'));
const HistoryPage = lazy(() => import('../../pages/HistoryPage'));
const SinglePage = lazy(() => import('../../pages/SinglePage'));

const App = () => {
  return (
    <Router>
      <AppHeader />

      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route end path='/' element={<MainPage />} />
          <Route end path='/about' element={<AboutPage />} />
          <Route end path='/history' element={<HistoryPage />} />

          <Route
            path='/launches/:id'
            element={<SinglePage Component={SingleLaunchLayout} dataType='launch' />} />
          <Route
            path='/launchpads/:id'
            element={<SinglePage Component={SingleLaunchpadLayout} dataType='launchpad' />} />
          <Route
            path='/landpads/:id'
            element={<SinglePage Component={SingleLandpadLayout} dataType='landpad' />} />
        </Routes>
      </Suspense>

      <AppFooter />
    </Router>
  )
}

export default App