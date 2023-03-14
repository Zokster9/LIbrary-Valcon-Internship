import { FormEvent, SyntheticEvent, useState } from 'react'

import Where from '../../../models/Where'
import './ModalFilter.css'

interface ModalFilterProps {
  show: boolean,
  closeModal: () => void
  applyFilter: (filter: Where[]) => void
}

const ModalFilter = ({ show, closeModal, applyFilter }: ModalFilterProps) => {
  const [ description, setDescription ] = useState('')
  const [ isbn, setIsbn ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const handleOnChangeDescription = ({ currentTarget }: FormEvent<HTMLTextAreaElement>) => {
    setDescription(currentTarget.value)
  }
  const handleOnChangeIsbn = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setIsbn(currentTarget.value)
  }
  const handleOnChangeFirstName = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setFirstName(currentTarget.value)
  }
  const handleOnChangeLastName = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setLastName(currentTarget.value)
  }
  const handleOnClickClear = () => {
    setDescription('')
    setIsbn('')
    setFirstName('')
    setLastName('')
  }
  const handleOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const filter: Where[] = [
      {
        Field: 'Description',
        Value: description,
        Operation: 2
      },
      {
        Field: 'ISBN',
        Value: isbn,
        Operation: 2
      },
      {
        Field: 'Authors.Firstname',
        Value: firstName,
        Operation: 2
      },
      {
        Field: 'Authors.Lastname',
        Value: lastName,
        Operation: 2
      }
    ]
    closeModal()
    applyFilter(filter)
  }
  return (
    <div style={!show ? { visibility: 'hidden' } : {}} className='modal'>
      <div className='overlay' onClick={closeModal} />
      <div className='content filter'>
        <h1>Filter</h1>
        <form className='filter-form' onSubmit={handleOnSubmit}>
          <div className='filter-form-group'>
            <label>Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={handleOnChangeDescription}
            />
          </div>
          <div className="filter-form-group">
            <label>ISBN</label>
            <input
              type='text'
              value={isbn}
              onChange={handleOnChangeIsbn}
            />
          </div>
          <div className="filter-form-group">
            <label>Author First Name</label>
            <input
              type='text'
              value={firstName}
              onChange={handleOnChangeFirstName}
            />
          </div>
          <div className="filter-form-group">
            <label>Author Last Name</label>
            <input
              type='text'
              value={lastName}
              onChange={handleOnChangeLastName}
            />
          </div>
          <div className='filter-form-button-group'>
            <button className='filter-form-button'>Apply filters</button>
            <button
              type='button'
              className='filter-form-button clear'
              onClick={handleOnClickClear}
            >
              Clear
            </button>
            <button
              type='button'
              className='filter-form-button close'
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalFilter
