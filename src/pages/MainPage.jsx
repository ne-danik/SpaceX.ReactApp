import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// components
import Landpads from "../components/Landpads/Landpads";
import LaunchesList from "../components/Launches/LaunchesList";
import UpcomingLaunchesList from "../components/UpcomingLaunches/UpcomingLaunchesList";
import Launchpads from "../components/Launchpads/Launchpads";
import NextLaunch from "../components/NextLaunch/NextLaunch";
import Search from "../components/Search/Search";
import SearchLaunches from '../components/SearchLaunches/SearchLaunches';

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams('');

  const searchValue = searchParams.get('name') || '';

  useEffect(() => {
    if (searchParams.get('name') === "") setSearchParams('');
  }, [searchParams])

  return (
    <>
      <Search
        searchValue={searchValue}
        setSearchParams={setSearchParams}
      />
      {searchValue.length ? (
        <SearchLaunches
          launchName={searchValue}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
      ) : (
        <>
          <NextLaunch />
          <UpcomingLaunchesList />
          <LaunchesList />
          <Launchpads />
          <Landpads />
        </>
      )}
    </>
  )
}

export default MainPage;