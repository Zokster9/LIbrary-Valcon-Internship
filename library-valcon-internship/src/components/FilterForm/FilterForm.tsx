import { Dispatch, FormEvent, SetStateAction } from 'react'

import Filter from '../../models/Filter'

import './FilterForm.css'

interface FilterFormProps {
  filterForm: Filter,
  setFilterForm: Dispatch<SetStateAction<Filter>>
}

const FilterForm = ({ filterForm, setFilterForm }: FilterFormProps) => {

  const handleOnChangeInput = (value: string, state: string) => {
    switch(state) {
      case 'Description':
        setFilterForm(filterForm => {
          return {
            ...filterForm,
            description: value
          }
        })
        break
      case 'Isbn':
        setFilterForm(filterForm => {
          return {
            ...filterForm,
            isbn: value
          }
        })
        break
      case 'FirstName':
        setFilterForm(filterForm => {
          return {
            ...filterForm,
            firstName: value
          }
        })
        break
      case 'LastName':
        setFilterForm(filterForm => {
          return {
            ...filterForm,
            lastName: value
          }
        })
        break
      default:
        break
    }
  }
  const handleOnClickClear = () => {
    setFilterForm({
      description: '',
      isbn: '',
      firstName: '',
      lastName: ''
    })
  }
  return (
    <>
      <h1>Filter</h1>
      <form className='filter-form'>
        <div className='filter-form-group'>
          <label>Description</label>
          <textarea
            style={{ resize: 'none' }}
            rows={4}
            value={filterForm.description}
            onChange={({ currentTarget }: FormEvent<HTMLTextAreaElement>) => {
              handleOnChangeInput(currentTarget.value, 'Description')
            }}
            draggable={false}
          />
        </div>
        <div className="filter-form-group">
          <label>ISBN</label>
          <input
            type='text'
            value={filterForm.isbn}
            onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
              handleOnChangeInput(currentTarget.value, 'Isbn')
            }}
          />
        </div>
        <div className="filter-form-group">
          <label>Author First Name</label>
          <input
            type='text'
            value={filterForm.firstName}
            onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
              handleOnChangeInput(currentTarget.value, 'FirstName')
            }}
          />
        </div>
        <div className="filter-form-group">
          <label>Author Last Name</label>
          <input
            type='text'
            value={filterForm.lastName}
            onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
              handleOnChangeInput(currentTarget.value, 'LastName')
            }}
          />
        </div>
        <div className='filter-form-button-group'>
          <button
            type='button'
            className='filter-form-button clear'
            onClick={handleOnClickClear}
          >
            Clear
          </button>
        </div>
      </form>
    </>
  )
}

export default FilterForm
