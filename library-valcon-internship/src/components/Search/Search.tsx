import { ChangeEvent, Dispatch, SetStateAction, useMemo } from 'react'


import debounce from 'lodash.debounce'
import './Search.css'

interface SearchProps {
  isSearchVisible: string | false | null
  setSearch: Dispatch<SetStateAction<string>>
}

const Search = ({ isSearchVisible, setSearch }: SearchProps) => {
  const handleSearchOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value)
  }
  const debouncedChangeHandler = useMemo(
    () => debounce(handleSearchOnChange, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [])
  return (
    <div className={isSearchVisible ? 'header-search' : 'hide-search'}>
      <input
        className='header-search-bar'
        type='text'
        placeholder='Search...'
        autoComplete='off'
        onChange={debouncedChangeHandler}
      />
    </div>
  )
}

export default Search
