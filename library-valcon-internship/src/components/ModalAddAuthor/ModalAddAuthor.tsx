import { Dispatch, FormEvent, SetStateAction, SyntheticEvent, useState } from 'react'

import ReactDOM from 'react-dom'

import { addNewAuthor } from '../../services/AuthorService'
import './ModalAddAuthor.css'

interface AddAuthorProps {
  show: boolean,
  closeModal: () => void,
  retrieveAuthors: boolean,
  setRetrieveAuthors: Dispatch<SetStateAction<boolean>>
}

const ModalAddAuthor = ({ show, closeModal, retrieveAuthors, setRetrieveAuthors }: AddAuthorProps) => {
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ invalidFirstName, setInvalidFirstName ] = useState(false)
  const [ invalidLastName, setInvalidLastName ] = useState(false)
  const [ invalidAuthorData, setInvalidAuthorData ] = useState(false)
  if (!show) return null
  const handleOnChangeFirstName = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setFirstName(currentTarget.value)
  }
  const handleOnBlurFirstName = () => {
    if (firstName.trim() === '')
      setInvalidFirstName(true)
  }
  const handleOnChangeLastName = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setLastName(currentTarget.value)
  }
  const handleOnBlurLastName = () => {
    if (lastName.trim() === '')
      setInvalidLastName(true)
  }
  const handleOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (firstName.trim() === '') {
      setInvalidFirstName(true)
      return
    }
    if (lastName.trim() === '') {
      setInvalidLastName(true)
      return
    }
    addNewAuthor(firstName, lastName)
      .then(() => {
        setRetrieveAuthors(!retrieveAuthors)
        handleOnCloseModal()
      })
      .catch(() => {
        setInvalidAuthorData(true)
      })
  }
  const handleOnCloseModal = () => {
    setFirstName('')
    setLastName('')
    setInvalidFirstName(false)
    setInvalidLastName(false)
    setInvalidAuthorData(false)
    closeModal()
  }
  return ReactDOM.createPortal(
    <div className='modal'>
      <div className='overlay' onClick={closeModal} />
      <div className='content'>
        <h2>Add author</h2>
        <form className='add-author-form' onSubmit={handleOnSubmit}>
          <div className='add-author-form-field'>
            <label className={invalidFirstName ? 'add-author-error-label' : ''}>
              {invalidFirstName ? 'Please enter first name' : 'First name'}
            </label>
            <input
              className={invalidFirstName ? 'add-author-error-input' : ''}
              id='firstName'
              name='firstName'
              type='text'
              value={firstName}
              placeholder='Enter first name...'
              onChange={handleOnChangeFirstName}
              onBlur={handleOnBlurFirstName}
              onFocus={() => setInvalidFirstName(false)}
            />
          </div>
          <div className='add-author-form-field'>
            <label className={invalidLastName ? 'add-author-error-label' : ''}>
              {invalidLastName ? 'Please enter last name' : 'Last name'}
            </label>
            <input
              className={invalidLastName ? 'add-author-error-input' : ''}
              id='lastName'
              name='lastName'
              type='text'
              value={lastName}
              placeholder='Enter last name...'
              onChange={handleOnChangeLastName}
              onBlur={handleOnBlurLastName}
              onFocus={() => setInvalidLastName(false)}
            />
          </div>
          <div className='add-author-button-field'>
            <div className={invalidAuthorData ? 'error-author-model' : 'author-modal-message'}>
              Something went wrong!
            </div>
            <div className='modal-btns'>
              <button className='add-author-button modal-btn'>Create</button>
              <button
                type='button'
                className='close-modal-btn modal-btn'
                onClick={handleOnCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  )
}

export default ModalAddAuthor
