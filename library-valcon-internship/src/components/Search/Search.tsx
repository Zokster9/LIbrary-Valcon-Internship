import { ChangeEvent, Dispatch, SetStateAction, useMemo, useState } from 'react'

import debounce from 'lodash.debounce'
import { BsSortDownAlt } from 'react-icons/bs'
import { VscFilter } from 'react-icons/vsc'

import Where from '../../models/Where'
import ModalFilter from '../Modals/ModalFilter/ModalFilter'
import ModalSort from '../Modals/ModalSort/ModalSort'
import './Search.css'

interface SearchProps {
  isSearchVisible: string | false | null
  setSearch: Dispatch<SetStateAction<string>>
  setFilter: Dispatch<SetStateAction<Where[]>>
}

const Search = ({ isSearchVisible, setSearch, setFilter }: SearchProps) => {
  const [ showFilter, setShowFilter ] = useState(false)
  const [ showSort, setShowSort ] = useState(false)
  const handleSearchOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value)
  }
  const handleFilterOnChange = (filter: Where[]) => setFilter(filter)
  const debouncedChangeHandler = useMemo(
    () => debounce(handleSearchOnChange, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return (
    <div className={isSearchVisible ? 'header-search' : 'hide-search'}>
      <input
        className='header-search-bar'
        type='text'
        placeholder='Search...'
        autoComplete='off'
        onChange={debouncedChangeHandler}
      />
      <VscFilter className='icon' onClick={() => setShowFilter(true)} title='Filter' />
      <BsSortDownAlt className='icon' onClick={() => setShowSort(true)} title='Sort' />
      <ModalFilter
        show={showFilter}
        closeModal={() => setShowFilter(false)}
        applyFilter={handleFilterOnChange}
      />
      <ModalSort
        show={showSort}
        closeModal={() => setShowSort(false)}
      />
    </div>
  )
}

export default Search
