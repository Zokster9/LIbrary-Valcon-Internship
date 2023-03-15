import { Dispatch, FormEvent, SetStateAction } from 'react'

import AuthorFormType from '../../models/AuthorFormType'
import AuthorFormValidation from '../../models/AuthorFormValidation'
import './AuthorForm.css'

interface AuthorFormProps {
  authorForm: AuthorFormType
  authorFormValidation: AuthorFormValidation
  setAuthorForm: Dispatch<SetStateAction<AuthorFormType>>
  setAuthorFormValidation: Dispatch<SetStateAction<AuthorFormValidation>>
}

const AuthorForm = ({ authorForm, authorFormValidation,
  setAuthorForm, setAuthorFormValidation }: AuthorFormProps) => {
  const handleOnChangeFirstName = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setAuthorForm((authorForm) => {
      return {
        ...authorForm,
        firstName: currentTarget.value
      }
    })
  }
  const handleOnBlurFirstName = () => {
    if (authorForm.firstName.trim() === '') {
      setAuthorFormValidation(authorFormValidation => {
        return {
          ...authorFormValidation,
          isFirstNameValid: false
        }
      })
    }
  }
  const handleOnChangeLastName = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setAuthorForm((authorForm) => {
      return {
        ...authorForm,
        lastName: currentTarget.value
      }
    })
  }
  const handleOnBlurLastName = () => {
    if (authorForm.lastName.trim() === '') {
      setAuthorFormValidation(authorFormValidation => {
        return {
          ...authorFormValidation,
          isLastNameValid: false
        }
      })
    }
  }
  return (
    <div className='add-author-form'>
      <div className='add-author-form-field'>
        <label className={!authorFormValidation.isFirstNameValid ? 'add-author-error-label' : ''}>
          {!authorFormValidation.isFirstNameValid ? 'Please enter first name' : 'First name'}
        </label>
        <input
          className={!authorFormValidation.isFirstNameValid ? 'add-author-error-input' : ''}
          id='firstName'
          name='firstName'
          type='text'
          value={authorForm.firstName}
          form='authorForm'
          placeholder='Enter first name...'
          onChange={handleOnChangeFirstName}
          onBlur={handleOnBlurFirstName}
          onFocus={
            () => {
              setAuthorFormValidation(authorFormValidation => {
                return { ...authorFormValidation, isFirstNameValid: true }
              })
            }
          }
          onClick={(e: FormEvent<HTMLInputElement>) => e.stopPropagation()}
        />
      </div>
      <div className='add-author-form-field'>
        <label className={!authorFormValidation.isLastNameValid ? 'add-author-error-label' : ''}>
          {!authorFormValidation.isLastNameValid ? 'Please enter last name' : 'Last name'}
        </label>
        <input
          className={!authorFormValidation.isLastNameValid ? 'add-author-error-input' : ''}
          id='lastName'
          name='lastName'
          type='text'
          value={authorForm.lastName}
          form='authorForm'
          placeholder='Enter last name...'
          onChange={handleOnChangeLastName}
          onBlur={handleOnBlurLastName}
          onFocus={
            () => {
              setAuthorFormValidation(authorFormValidation => {
                return { ...authorFormValidation, isLastNameValid: true }
              })
            }
          }
          onClick={(e: FormEvent<HTMLInputElement>) => e.stopPropagation()}
        />
      </div>
      <div className='add-author-button-field'>
        <div className={!authorFormValidation.isAuthorDataValid ? 'error-author-model' : 'author-modal-message'}>
          Something went wrong!
        </div>
        <div className='modal-btns'>
          <button
            form='authorForm'
            className='add-author-button modal-btn'
            onClick={(e: FormEvent<HTMLButtonElement>) => {
              e.stopPropagation()
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthorForm
