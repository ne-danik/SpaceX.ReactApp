// hooks
import { useSearch } from "../../hooks/useSearch";
// components
import Search from "../../components/Search/Search";
import ShipsList from "../../components/ShipsList/ShipsList";
import SearchResultShips from "../../components/SearchResultShips/SearchResultShips";

const ShipsPage = ({ data }) => {
  const { searchValue, setSearchValue, setSearchParams, foundData } = useSearch(data, 'name');

  return (
    <>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setSearchParams={setSearchParams}
        placeholder={'Search ship...'}
      />

      {searchValue.length ? (
        <SearchResultShips data={foundData} searchValue={searchValue} />
      ) : (
        <ShipsList data={foundData} />
      )}
    </>
  )
}

export default ShipsPage;