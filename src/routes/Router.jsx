import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Spinner from '../components/Spinner/Spinner';

// single pages
const SingleCrewPage = lazy(() => import('../pages/singlePages/singleCrewPage/SingleCrewPage'));
const SingleLaunchPage = lazy(() => import('../pages/singlePages/singleLaunchPage/SingleLaunchPage'));
const SingleLaunchpadPage = lazy(() => import('../pages/singlePages/singleLaunchpadPage/SingleLaunchpadPage'));
const SingleLandpadPage = lazy(() => import('../pages/singlePages/singleLandpadPage/SingleLandpadPage'));
const SingleStarlinkPage = lazy(() => import('../pages/singlePages/singleStarlinkPage/SingleStarlinkPage'));
const SingleDragonPage = lazy(() => import('../pages/singlePages/singleDragonPage/SingleDragonPage'));
const SingleRocketPage = lazy(() => import('../pages/singlePages/singleRocketPage/SingleRocketPage'));
const SingleShipPage = lazy(() => import('../pages/singlePages/singleShipPage/SingleShipPage'));

const MainPageLayout = lazy(() => import('../pages/layouts/MainPageLayout'));
// categories layouts
const CrewPageLayout = lazy(() => import('../pages/layouts/CrewPageLayout'));
const StarlinkPageLayout = lazy(() => import('../pages/layouts/StarlinkPageLayout'));
const DragonsPageLayout = lazy(() => import('../pages/layouts/DragonsPageLayout'));
const RocketsPageLayout = lazy(() => import('../pages/layouts/RocketsPageLayout'));
const ShipsPageLayout = lazy(() => import('../pages/layouts/ShipsPageLayout'));

const CategoryPage = lazy(() => import('../pages/CategoryPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

const MainPage = lazy(() => import('../pages/MainPage'));
const AboutPage = lazy(() => import('../pages/aboutPage/AboutPage'));
const HistoryPage = lazy(() => import('../pages/historyPage/HistoryPage'));
const CrewPage = lazy(() => import('../pages/crewPage/CrewPage'));
const StarlinkPage = lazy(() => import('../pages/StarlinkPage'));
const DragonsPage = lazy(() => import('../pages/DragonsPage'));
const RocketsPage = lazy(() => import('../pages/RocketsPage'));
const ShipsPage = lazy(() => import('../pages/ShipsPage'));
const NotFoundPage = lazy(() => import('../pages/notFoundPage/NotFoundPage'));

const Router = () => {
  return (
    <Suspense fallback={<Spinner />}>
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
    </Suspense>
  )
}

export default Router;