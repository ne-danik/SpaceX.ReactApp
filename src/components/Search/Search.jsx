import { useState } from 'react';
// styles
import './search.scss';
// resources
import { ReactComponent as IconSearch } from '../../resources/icons/search.svg';
import { ReactComponent as IconReset } from '../../resources/icons/close.svg';

const Search = ({ searchValue, setSearchParams, setSearchValue, placeholder = 'search...' }) => {
  const [stateSearch, setStateSearch] = useState(searchValue);

  const params = {
    name: stateSearch,
  };

  const onSubmitSearchForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const value = form.search.value;

    setStateSearch(value);
    setSearchValue(value);
    params.name = value;
    setSearchParams(params);
  }

  const handleChangeSearchInput = (e) => {
    const value = e.target.value;
    setStateSearch(value);
  }

  const onResetInput = () => {
    setStateSearch('');
    setSearchValue('');
    params.name = '';
    setSearchParams('');
  }

  return (
    <>
      <div className="container">
        <form className="search" autoComplete='off' onSubmit={onSubmitSearchForm}>
          <input
            type="text"
            name="search"
            placeholder={placeholder}
            value={stateSearch}
            onChange={handleChangeSearchInput}
            className="search__input"
          />
          {params.name ? (
            <button
              type="button"
              onClick={onResetInput}
              className="input__btn input__btn_reset"
              title="Reset"
            >
              <IconReset />
            </button>
          ) : null}
          <button
            type="submit"
            className="input__btn input__btn_search"
            title="Search"
          >
            <IconSearch />
          </button>
        </form>
      </div>
    </>
  )
}

export default Search;