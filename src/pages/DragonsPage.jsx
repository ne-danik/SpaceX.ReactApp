// hooks
import { useSearch } from "../hooks/useSearch";
// components
import Search from "../components/Search/Search";
import DragonsList from "../components/DragonsList/DragonsList";
import SearchResultDragons from "../components/SearchResultDragons/SearchResultDragons";

const DragonsPage = ({ data }) => {
  const { searchValue, setSearchValue, setSearchParams, foundData } = useSearch(data, 'name');

  return (
    <>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setSearchParams={setSearchParams}
        placeholder={'Search dragon...'}
      />

      {searchValue.length ? (
        <SearchResultDragons data={foundData} searchValue={searchValue} />
      ) : (
        <DragonsList data={foundData} />
      )}
    </>
  )
}

export default DragonsPage;