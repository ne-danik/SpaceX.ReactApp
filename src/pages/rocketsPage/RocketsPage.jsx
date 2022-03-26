// hooks
import { useSearch } from "../../hooks/useSearch";
// components
import Search from "../../components/Search/Search";
import RocketsList from "../../components/RocketsList/RocketsList";
import SearchResultRockets from "../../components/SearchResultRockets/SearchResultRockets";
// styles
import './rocketsPage.scss';

const RocketsPage = ({ data }) => {
  const { searchValue, setSearchValue, setSearchParams, foundData } = useSearch(data, 'name');

  return (
    <>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setSearchParams={setSearchParams}
        placeholder={'Search rocket...'}
      />

      {searchValue.length ? (
        <SearchResultRockets data={foundData} searchValue={searchValue} />
      ) : (
        <RocketsList data={foundData} />
      )}
    </>
  )
}

export default RocketsPage;