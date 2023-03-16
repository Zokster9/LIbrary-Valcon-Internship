import { Dispatch, FormEvent, SetStateAction } from 'react'

import AuthorFormType from '../../models/AuthorFormType'
import AuthorFormValidation from '../../models/AuthorFormValidation'
import './AuthorForm.css'

interface AuthorFormProps {
  authorForm: AuthorFormType
  authorFormValidation: AuthorFormValidation
  setAuthorForm: Dispatch<SetStateAction<AuthorFormType>>
  setAuthorFormValidation: Dispatch<SetStateAction<AuthorFormValidation>>
  title?: string
  onSubmit?: () => void
}

const AuthorForm = ({ authorForm, authorFormValidation,
  setAuthorForm, setAuthorFormValidation, title, onSubmit }: AuthorFormProps) => {
  const handleOnChangeInput = (value: string, formProperty: string) => {
    switch (formProperty) {
      case 'FirstName':
        setAuthorForm((authorForm) => {
          return {
            ...authorForm,
            firstName: value
          }
        })
        break
      case 'LastName':
        setAuthorForm((authorForm) => {
          return {
            ...authorForm,
            lastName: value
          }
        })
        break
      default:
        break
    }
  }
  const handleOnBlurInput = (formProperty: string) => {
    switch (formProperty) {
      case 'FirstName':
        if (authorForm.firstName.trim() === '') {
          setAuthorFormValidation(authorFormValidation => {
            return {
              ...authorFormValidation,
              isFirstNameValid: false
            }
          })
        }
        break
      case 'LastName':
        if (authorForm.lastName.trim() === '') {
          setAuthorFormValidation(authorFormValidation => {
            return {
              ...authorFormValidation,
              isLastNameValid: false
            }
          })
        }
        break
      default:
        break
    }
  }
  return (
    <>
      <h1 className='add-author-header'>{title}</h1>
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
            onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
              handleOnChangeInput(currentTarget.value, 'FirstName')
            }}
            onBlur={() => handleOnBlurInput('FirstName')}
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
            onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
              handleOnChangeInput(currentTarget.value, 'LastName')
            }}
            onBlur={() => handleOnBlurInput('LastName')}
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
        {onSubmit &&
          <div className='add-author-button-field'>
            <div className={!authorFormValidation.isAuthorDataValid ? 'error-author-modal' : 'author-modal-message'}>
              Something went wrong!
            </div>
            <div className='modal-btn'>
              <button
                type='button'
                id='create'
                form='authorForm'
                className='add-author-button modal-btn'
                onClick={(e: FormEvent<HTMLButtonElement>) => {
                  e.stopPropagation()
                  onSubmit()
                }}
              >
                Create
              </button>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default AuthorForm
