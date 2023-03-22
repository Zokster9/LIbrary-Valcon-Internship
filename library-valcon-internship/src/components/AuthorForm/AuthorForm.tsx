import { Dispatch, FormEvent, SetStateAction } from 'react'

import _ from 'lodash'

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

  const handleOnChangeInput = (value: string, formProperty: keyof AuthorFormType) => {
    setAuthorForm((authorForm) => {
      return {
        ...authorForm,
        [formProperty]: value
      }
    })
  }
  const handleOnBlurInput = (formProperty: keyof AuthorFormType,
    validationProperty: keyof AuthorFormValidation) => {
    if (authorForm[formProperty].trim() === '') {
      setAuthorFormValidation(authorFormValidation => {
        return {
          ...authorFormValidation,
          [validationProperty]: false
        }
      })
    }
  }
  return (
    <>
      <h1 className='add-author-header'>{title}</h1>
      <div className='add-author-form'>
        {
          Object.keys(authorForm).map(property => { return(
            <div key={property} className='add-author-form-field'>
              <label className={!authorFormValidation[`is${_.upperFirst(property)}Valid` as keyof AuthorFormValidation]
                ?
                'add-author-error-label':
                ''
              }
              >
                {
                  !authorFormValidation[`is${_.upperFirst(property)}Valid` as keyof AuthorFormValidation]
                    ? `Please enter ${_.startCase(property)}`
                    : `${_.startCase(property)}`
                }
              </label>
              <input
                className=
                  {
                    !authorFormValidation[`is${_.upperFirst(property)}Valid` as keyof AuthorFormValidation]
                      ? 'add-author-error-input'
                      : ''
                  }
                id={property}
                name={property}
                type='text'
                value={authorForm[property as keyof AuthorFormType]}
                placeholder={`Enter ${_.startCase(property)}...`}
                onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
                  handleOnChangeInput(currentTarget.value, property as keyof AuthorFormType)
                }}
                onBlur={() => handleOnBlurInput(property as keyof AuthorFormType,
                  `is${_.upperFirst(property)}Valid` as keyof AuthorFormValidation)}
                onFocus={
                  () => {
                    setAuthorFormValidation(authorFormValidation => {
                      return { ...authorFormValidation, [`is${_.upperFirst(property)}Valid`]: true }
                    })
                  }
                }
                onClick={(e: FormEvent<HTMLInputElement>) => e.stopPropagation()}
              />
            </div>
          )})
        }
        {onSubmit &&
          <div className='add-author-button-field'>
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
