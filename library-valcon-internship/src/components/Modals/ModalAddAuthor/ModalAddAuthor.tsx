import { Dispatch, SetStateAction, useState } from 'react'

import ReactDOM from 'react-dom'

import AuthorFormType from '../../../models/AuthorFormType'
import AuthorFormValidation from '../../../models/AuthorFormValidation'
import { addNewAuthor } from '../../../services/AuthorService'
import AuthorForm from '../../AuthorForm/AuthorForm'
import '../Modals.css'
import './ModalAddAuthor.css'

interface AddAuthorProps {
  show: boolean,
  closeModal: () => void,
  retrieveAuthors: boolean,
  setRetrieveAuthors: Dispatch<SetStateAction<boolean>>
}

const ModalAddAuthor = ({ show, closeModal, retrieveAuthors, setRetrieveAuthors }: AddAuthorProps) => {
  const [ authorForm, setAuthorForm ] = useState<AuthorFormType>({
    firstName: '',
    lastName: ''
  })
  const [ authorFormValidation, setAuthorFormValidation ] = useState<AuthorFormValidation>({
    isFirstNameValid: true,
    isLastNameValid: true,
    isAuthorDataValid: true
  })
  if (!show) return null

  const handleOnSubmit = () => {
    if (authorForm.firstName.trim() === '') {
      setAuthorFormValidation(authorFormValidation => {
        return {
          ...authorFormValidation,
          isFirstNameValid: false
        }
      })
      return
    }
    if (authorForm.lastName.trim() === '') {
      setAuthorFormValidation(authorFormValidation => {
        return {
          ...authorFormValidation,
          isLastNameValid: false
        }
      })
      return
    }
    addNewAuthor(authorForm.firstName.trim(), authorForm.lastName.trim())
      .then(() => {
        setRetrieveAuthors(!retrieveAuthors)
        handleOnCloseModal()
      })
      .catch(() => {
        setAuthorFormValidation(authorFormValidation => {
          return {
            ...authorFormValidation,
            isAuthorDataValid: false
          }
        })
      })
  }
  const handleOnCloseModal = () => {
    setAuthorForm({
      firstName: '',
      lastName: ''
    })
    setAuthorFormValidation({
      isFirstNameValid: true,
      isLastNameValid: true,
      isAuthorDataValid: true
    })
    closeModal()
  }
  return ReactDOM.createPortal(
    <div className='modal'>
      <div className='overlay' onClick={closeModal} />
      <div className='content'>
        <form id='authorForm' onSubmit={handleOnSubmit}>
          <AuthorForm
            authorForm={authorForm}
            authorFormValidation={authorFormValidation}
            setAuthorForm={setAuthorForm}
            setAuthorFormValidation={setAuthorFormValidation}
            title='Add an author'
            onSubmit={handleOnSubmit}
          />
        </form>
        <button
          className='add-author-close-modal'
          type='button'
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  )
}

export default ModalAddAuthor
