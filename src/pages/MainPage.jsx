import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// components
import Landpads from "../components/Landpads/Landpads";
import LaunchesList from "../components/Launches/LaunchesList";
import UpcomingLaunchesList from "../components/UpcomingLaunches/UpcomingLaunchesList";
import Launchpads from "../components/Launchpads/Launchpads";
import NextLaunch from "../components/NextLaunch/NextLaunch";
import Search from "../components/Search/Search";
import SearchResultLaunches from '../components/SearchResultLaunches/SearchResultLaunches';

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const [searchValue, setSearchValue] = useState(searchParams.get('name') || '');

  useEffect(() => {
    if (searchParams.get('name') === "") setSearchParams('');
  }, [searchParams])

  return (
    <>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setSearchParams={setSearchParams}
        placeholder={'Search launches...'}
      />
      {searchValue.length ? (
        <SearchResultLaunches searchValue={searchValue} />
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