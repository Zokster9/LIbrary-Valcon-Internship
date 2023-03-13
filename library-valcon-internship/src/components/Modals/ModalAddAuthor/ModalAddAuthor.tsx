import { Dispatch, FormEvent, SetStateAction, SyntheticEvent, useState } from 'react'

import ReactDOM from 'react-dom'

import { addNewAuthor } from '../../../services/AuthorService'
import '../Modals.css'
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
  const [ isFirstNameValid, setIsFirstNameValid ] = useState(true)
  const [ isLastNameValid, setIsLastNameValid ] = useState(true)
  const [ isAuthorDataValid, setIsAuthorDataValid ] = useState(true)
  if (!show) return null
  const handleOnChangeFirstName = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setFirstName(currentTarget.value)
  }
  const handleOnBlurFirstName = () => {
    if (firstName.trim() === '')
      setIsFirstNameValid(false)
  }
  const handleOnChangeLastName = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setLastName(currentTarget.value)
  }
  const handleOnBlurLastName = () => {
    if (lastName.trim() === '')
      setIsLastNameValid(false)
  }
  const handleOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (firstName.trim() === '') {
      setIsFirstNameValid(false)
      return
    }
    if (lastName.trim() === '') {
      setIsLastNameValid(false)
      return
    }
    addNewAuthor(firstName.trim(), lastName.trim())
      .then(() => {
        setRetrieveAuthors(!retrieveAuthors)
        handleOnCloseModal()
      })
      .catch(() => {
        setIsAuthorDataValid(false)
      })
  }
  const handleOnCloseModal = () => {
    setFirstName('')
    setLastName('')
    setIsFirstNameValid(true)
    setIsLastNameValid(true)
    setIsAuthorDataValid(true)
    closeModal()
  }
  return ReactDOM.createPortal(
    <div className='modal'>
      <div className='overlay' onClick={closeModal} />
      <div className='content'>
        <h2>Add author</h2>
        <form className='add-author-form' onSubmit={handleOnSubmit}>
          <div className='add-author-form-field'>
            <label className={!isFirstNameValid ? 'add-author-error-label' : ''}>
              {!isFirstNameValid ? 'Please enter first name' : 'First name'}
            </label>
            <input
              className={!isFirstNameValid ? 'add-author-error-input' : ''}
              id='firstName'
              name='firstName'
              type='text'
              value={firstName}
              placeholder='Enter first name...'
              onChange={handleOnChangeFirstName}
              onBlur={handleOnBlurFirstName}
              onFocus={() => setIsFirstNameValid(true)}
            />
          </div>
          <div className='add-author-form-field'>
            <label className={!isLastNameValid ? 'add-author-error-label' : ''}>
              {!isLastNameValid ? 'Please enter last name' : 'Last name'}
            </label>
            <input
              className={!isLastNameValid ? 'add-author-error-input' : ''}
              id='lastName'
              name='lastName'
              type='text'
              value={lastName}
              placeholder='Enter last name...'
              onChange={handleOnChangeLastName}
              onBlur={handleOnBlurLastName}
              onFocus={() => setIsLastNameValid(true)}
            />
          </div>
          <div className='add-author-button-field'>
            <div className={!isAuthorDataValid ? 'error-author-model' : 'author-modal-message'}>
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
