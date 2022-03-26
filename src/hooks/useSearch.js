import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearch = (data, filterProp) => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const [searchValue, setSearchValue] = useState(searchParams.get(filterProp) || '');
  
  useEffect(() => {
    if (searchParams.get(filterProp) === "") setSearchParams('');
  }, [searchParams])

  const foundData = searchValue ?
    data.filter((item) =>
      RegExp(searchValue, "ig").test(item[filterProp])
    ) :
    data;

  return {
    searchValue,
    setSearchValue,
    setSearchParams,
    foundData
  };
}