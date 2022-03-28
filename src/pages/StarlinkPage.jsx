// hooks
import { useSearch } from "../hooks/useSearch";
// components
import Search from "../components/Search/Search";
import StarlinkList from "../components/StarlinkList/StarlinkList";
import SearchResultStarlink from "../components/SearchResultStarlink/SearchResultStarlink";

const StarlinkPage = ({ data }) => {
  const { searchValue, setSearchValue, setSearchParams, foundData } = useSearch(data, 'name');

  return (
    <>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setSearchParams={setSearchParams}
        placeholder={'Search starlink...'}
      />

      {searchValue.length ? (
        <SearchResultStarlink data={foundData} searchValue={searchValue} />
      ) : (
        <StarlinkList data={foundData} />
      )}
    </>
  )
}

export default StarlinkPage;