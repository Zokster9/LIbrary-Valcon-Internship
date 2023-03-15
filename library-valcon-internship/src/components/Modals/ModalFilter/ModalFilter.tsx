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

  const handleOnChangeInput = (value: string, state: string) => {
    switch(state) {
      case 'Description':
        setDescription(value)
        break
      case 'Isbn':
        setIsbn(value)
        break
      case 'FirstName':
        setFirstName(value)
        break
      case 'LastName':
        setLastName(value)
        break
      default:
        break
    }
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
              style={{ resize: 'none' }}
              rows={4}
              value={description}
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
              value={isbn}
              onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
                handleOnChangeInput(currentTarget.value, 'Isbn')
              }}
            />
          </div>
          <div className="filter-form-group">
            <label>Author First Name</label>
            <input
              type='text'
              value={firstName}
              onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
                handleOnChangeInput(currentTarget.value, 'FirstName')
              }}
            />
          </div>
          <div className="filter-form-group">
            <label>Author Last Name</label>
            <input
              type='text'
              value={lastName}
              onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
                handleOnChangeInput(currentTarget.value, 'LastName')
              }}
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
