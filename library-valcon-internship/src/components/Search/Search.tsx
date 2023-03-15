import { ChangeEvent, Dispatch, SetStateAction, useMemo, useState } from 'react'

import debounce from 'lodash.debounce'
import { BsSortDownAlt } from 'react-icons/bs'
import { VscFilter } from 'react-icons/vsc'

import Where from '../../models/Where'
import Modal from '../Modals/Modal'
import ModalFilter from '../Modals/ModalFilter/ModalFilter'
import ModalSort from '../Modals/ModalSort/ModalSort'
import './Search.css'

interface SearchProps {
  isSearchVisible: string | false | null
  setSearch: Dispatch<SetStateAction<string>>
  setFilter: Dispatch<SetStateAction<Where[]>>
  setSort: Dispatch<SetStateAction<string[]>>
}

const Search = ({ isSearchVisible, setSearch, setFilter, setSort }: SearchProps) => {
  const [ showModal, setShowModal ] = useState(false)
  const [ showFilter, setShowFilter ] = useState(false)
  const [ showSort, setShowSort ] = useState(false)

  const handleSearchOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value)
  }
  const handleFilterOnChange = (filter: Where[]) => setFilter(filter)
  const handleSortOnChange = (sort: string[]) => setSort(sort)

  const handleToggleFilterModal = () => {
    setShowFilter(!showFilter)
    setShowModal(!showModal)
  }

  const handleToggleSortModal = () => {
    setShowSort(!showSort)
    setShowModal(!showModal)
  }

  const handleCloseModal = () => {
    setShowFilter(false)
    setShowSort(false)
    setShowModal(false)
  }

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
      <VscFilter className='icon' onClick={handleToggleFilterModal} title='Filter' />
      <BsSortDownAlt className='icon' onClick={handleToggleSortModal} title='Sort' />
      <Modal show={showModal} closeModal={handleCloseModal} >
        { showFilter && <ModalFilter closeModal={handleCloseModal} applyFilter={handleFilterOnChange} />}
        { showSort && <ModalSort closeModal={handleCloseModal} applySort={handleSortOnChange} />}
      </Modal>
    </div>
  )
}

export default Search
