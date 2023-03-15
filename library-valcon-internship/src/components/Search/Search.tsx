import { ChangeEvent, Dispatch, SetStateAction, useMemo, useState } from 'react'

import debounce from 'lodash.debounce'
import { VscFilter } from 'react-icons/vsc'

import Filter from '../../models/Filter'
import Sort from '../../models/Sort'
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
  const [ filterForm, setFilterForm ] = useState<Filter>({
    description: '',
    isbn: '',
    firstName: '',
    lastName: ''
  })
  const [ sortForm, setSortForm ] = useState<Sort>({
    titleSort: '',
    isbnSort: '',
    publishDateSort: '',
    descriptionSort: ''
  })

  const handleSearchOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value)
  }

  const handleToggleModal = () => {
    setShowModal(!showModal)
  }

  const handleConfirmFilter = () => {
    const filter: Where[] = [
      {
        Field: 'Description',
        Value: filterForm.description,
        Operation: 2
      },
      {
        Field: 'ISBN',
        Value: filterForm.isbn,
        Operation: 2
      },
      {
        Field: 'Authors.Firstname',
        Value: filterForm.firstName,
        Operation: 2
      },
      {
        Field: 'Authors.Lastname',
        Value: filterForm.lastName,
        Operation: 2
      }
    ]
    setFilter(filter)
  }

  const handleConfirmSort = () => {
    const sort: string[] = [
      sortForm.titleSort,
      sortForm.isbnSort,
      sortForm.publishDateSort,
      sortForm.descriptionSort
    ]
    setSort(sort)
  }

  const debouncedChangeHandler = useMemo(
    () => debounce(handleSearchOnChange, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleConfirm = () => {
    handleConfirmFilter()
    handleConfirmSort()
  }
  return (
    <div className={isSearchVisible ? 'header-search' : 'hide-search'}>
      <input
        className='header-search-bar'
        type='text'
        placeholder='Search...'
        autoComplete='off'
        onChange={debouncedChangeHandler}
      />
      <VscFilter className='icon' onClick={handleToggleModal} title='Filter' />
      <Modal show={showModal} closeModal={handleToggleModal} confirm={handleConfirm} >
        <ModalFilter filterForm={filterForm} setFilterForm={setFilterForm} />
        <hr />
        <ModalSort sortForm={sortForm} setSortForm={setSortForm} />
      </Modal>
    </div>
  )
}

export default Search
