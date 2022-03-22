import { useState } from 'react';
// styles
import './search.scss';
// resources
import { ReactComponent as ResetInput } from '../../resources/icons/close.svg';

const Search = ({ searchValue, setSearchParams }) => {
  const [stateSearch, setStateSearch] = useState(searchValue);

  const params = {
    name: stateSearch,
  };

  const onSubmitSearch = (event) => {
    event.preventDefault();
    const form = event.target;
    const value = form.search.value;

    setStateSearch(value);
    params.name = value;
    setSearchParams(params);
  }

  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setStateSearch(value);
  }

  const onResetClick = () => {
    setStateSearch('');
    params.name = '';
    setSearchParams('');
  }

  return (
    <form className="search" autoComplete='off' onSubmit={onSubmitSearch}>
      <input
        type="text"
        name="search"
        placeholder="search..."
        value={stateSearch}
        onChange={handleChangeSearch}
        className="search__input"
      />
      {params.name ? (
        <button type="button" onClick={onResetClick} className="input__btn input__btn_reset" title="Reset">
          <ResetInput />
        </button>
      ) : null}
      <button type="submit" className="input__btn input__btn_search" title="Search">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.3958 18.2169L16.0625 14.8795C15.9545 14.7689 15.8343 14.6709 15.7042 14.5875L14.8708 14.0118C16.5849 11.8883 16.6009 8.85915 14.9092 6.71771C13.2175 4.57626 10.2697 3.89403 7.81091 5.07493C5.35217 6.25582 4.0387 8.98467 4.64811 11.6459C5.25752 14.3072 7.62717 16.1906 10.3542 16.1811C11.6775 16.1815 12.9617 15.7313 13.9958 14.9046L14.6208 15.7389C14.695 15.8463 14.7786 15.9469 14.8708 16.0393L18.2042 19.3766C18.2824 19.4556 18.3889 19.5 18.5 19.5C18.6111 19.5 18.7176 19.4556 18.7958 19.3766L19.3792 18.7926C19.5374 18.6359 19.5447 18.3824 19.3958 18.2169ZM10.3542 14.5124C8.05298 14.5124 6.1875 12.6447 6.1875 10.3407C6.1875 8.03676 8.05298 6.16903 10.3542 6.16903C12.6554 6.16903 14.5208 8.03676 14.5208 10.3407C14.5208 11.4471 14.0818 12.5082 13.3004 13.2906C12.519 14.0729 11.4592 14.5124 10.3542 14.5124Z"
            fill="#3c3c3c" />
        </svg>
      </button>
      <button type="button" className="input__btn input__btn_filter" title="Filter">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="14" y="16" width="6" height="2" rx="1" fill="#3c3c3c" />
          <rect x="4" y="16" width="2" height="2" rx="1" fill="#3c3c3c" />
          <path fillRule="evenodd" clipRule="evenodd" d="M10 20C11.6569 20 13 18.6569 13 17C13 15.3431 11.6569 14 10 14C8.34315 14 7 15.3431 7 17C7 18.6569 8.34315 20 10 20ZM10 18C10.5523 18 11 17.5523 11 17C11 16.4477 10.5523 16 10 16C9.44772 16 9 16.4477 9 17C9 17.5523 9.44772 18 10 18Z" fill="#3c3c3c" />
          <rect x="4" y="6" width="6" height="2" rx="1" fill="#3c3c3c" />
          <rect x="18" y="6" width="2" height="2" rx="1" fill="#3c3c3c" />
          <path fillRule="evenodd" clipRule="evenodd" d="M14 10C15.6569 10 17 8.65685 17 7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7C11 8.65685 12.3431 10 14 10ZM14 8C14.5523 8 15 7.55228 15 7C15 6.44772 14.5523 6 14 6C13.4477 6 13 6.44772 13 7C13 7.55228 13.4477 8 14 8Z" fill="#3c3c3c" />
        </svg>
      </button>
    </form>
  )
}

export default Search;