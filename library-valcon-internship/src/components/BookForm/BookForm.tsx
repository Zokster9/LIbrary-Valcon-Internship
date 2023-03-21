import { Dispatch, FormEvent, SetStateAction, SyntheticEvent, useRef, useState } from 'react'

import Select, { MultiValue } from 'react-select'

import placeholderBook from '../../assets/icons/placeholder-book.png'
import Author from '../../models/Author'
import AuthorFormType from '../../models/AuthorFormType'
import AuthorFormValidation from '../../models/AuthorFormValidation'
import BookFormType from '../../models/BookFormType'
import BookFormValidation from '../../models/BookFormValidation'
import { convertDateToInputDate, setDefaultCoverValue } from '../../utils/Utils'
import AuthorForm from '../AuthorForm/AuthorForm'
import './BookForm.css'

interface BookFormProps {
  bookForm: BookFormType
  bookFormValidation: BookFormValidation
  authorForm?: AuthorFormType
  authorFormValidation?: AuthorFormValidation
  setBookForm: Dispatch<SetStateAction<BookFormType>>
  setBookFormValidation: Dispatch<SetStateAction<BookFormValidation>>
  setAuthorForm?: Dispatch<SetStateAction<AuthorFormType>>
  setAuthorFormValidation?: Dispatch<SetStateAction<AuthorFormValidation>>
  handleOnAuthorSubmit?: () => void
  handleOnBookSubmit: (e: SyntheticEvent) => void
  title: string
  handleShowAuthorModal?: () => void
}

const BookForm = ({
  bookForm, bookFormValidation, authorForm, authorFormValidation,
  setBookForm, setBookFormValidation, setAuthorForm, setAuthorFormValidation,
  handleOnAuthorSubmit, handleOnBookSubmit, title, handleShowAuthorModal
}: BookFormProps) => {
  const [ cover, setCover ] = useState(setDefaultCoverValue(bookForm.requestCover))
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const [ showAccordion, setShowAccordion ] = useState(false)

  const handleCoverClick = () => {
    if (hiddenFileInput.current)
      hiddenFileInput.current.click()
  }
  const handleFileChange = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    if (currentTarget.files) {
      const files = currentTarget.files
      const reader = new FileReader()
      if (files) {
        reader.readAsDataURL(files[0])
        setBookForm(bookForm => {
          return {
            ...bookForm,
            requestCover: files[0]
          }
        })
        reader.onloadend = function () {
          const base64data = reader.result
          if (base64data)
            setCover(base64data as string)
        }
      }
    }
  }

  const handleOnChangeInput = (value: string, formProperty: keyof BookFormType) => {
    setBookForm(bookForm => {
      return {
        ...bookForm,
        [formProperty]: formProperty === 'releaseDate' ? new Date(value) : value
      }
    })
  }
  const handleOnBlurInput = (formProperty: keyof BookFormType,
    validationProperty: keyof BookFormValidation) => {
    if (formProperty === 'releaseDate') {
      if (!bookForm[formProperty]) {
        setBookFormValidation(bookFormValidation => {
          return {
            ...bookFormValidation,
            [validationProperty]: false
          }
        })
      }
    } else {
      const formValue: string = bookForm[formProperty] as string
      if (formValue.trim() === '') {
        setBookFormValidation(bookFormValidation => {
          return {
            ...bookFormValidation,
            [validationProperty]: false
          }
        })
      }
    }
  }

  const handleOnSelectedAuthorsChange = (authorsData: MultiValue<Author>) => {
    setBookForm(bookForm => {
      return {
        ...bookForm,
        selectedAuthors: authorsData as Author[]
      }
    })
  }

  const handleRemoveCover = () => {
    setCover('')
    setBookForm(bookForm => {
      return {
        ...bookForm,
        requestCover: new Blob()
      }
    })
  }

  return (
    <>
      <h1 className='book-header'>{title}</h1>
      <form id='authorForm' onSubmit={handleOnAuthorSubmit} />
      <form className='book-form' onSubmit={handleOnBookSubmit}>
        <div className="book-form-field">
          <h3>Add a cover</h3>
          <button className='book-placeholder' type='button' onClick={handleCoverClick}>
            <img
              className='book-cover'
              src={cover ? cover : placeholderBook}
              alt='placeholder-book'
            />
          </button>
          <button className='book-remove-cover-btn' type='button' onClick={handleRemoveCover}>Remove cover</button>
          <input
            className='book-text-area'
            type='file'
            id='file'
            name='file'
            ref={hiddenFileInput}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className='book-form-fields'>
          <div className='book-form-field'>
            <label className={!bookFormValidation.isTitleValid ? 'book-error-label' : ''}>
              {!bookFormValidation.isTitleValid ? 'Please enter title' : 'Title'}
            </label>
            <input
              className={
                !bookFormValidation.isTitleValid ? 'book-input book-error-input' : 'book-input'
              }
              type='text'
              id='title'
              name='title'
              placeholder='Enter title...'
              value={bookForm.title}
              onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
                handleOnChangeInput(currentTarget.value, 'title')
              }}
              onBlur={() => handleOnBlurInput('title', 'isTitleValid')}
              onFocus={
                () => {
                  setBookFormValidation(bookFormValidation => {
                    return { ...bookFormValidation, isTitleValid: true }
                  })
                }
              }
            />
          </div>
          <div className='book-form-field'>
            <label className={!bookFormValidation.isIsbnValid ? 'book-error-label' : ''}>
              {!bookFormValidation.isIsbnValid ? 'Please enter ISBN' : 'ISBN'}
            </label>
            <input
              className={
                !bookFormValidation.isIsbnValid ? 'book-input book-error-input' : 'book-input'
              }
              type='text'
              placeholder='Enter ISBN...'
              value={bookForm.isbn}
              onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
                handleOnChangeInput(currentTarget.value, 'isbn')
              }}
              onBlur={() => handleOnBlurInput('isbn', 'isIsbnValid')}
              onFocus={
                () => {
                  setBookFormValidation(bookFormValidation => {
                    return { ...bookFormValidation, isIsbnValid: true }
                  })
                }
              }
            />
          </div>
        </div>
        <div className='book-form-field'>
          <label className={!bookFormValidation.isDescriptionValid ? 'book-error-label' : ''}>
            {!bookFormValidation.isDescriptionValid ? 'Please enter description' : 'Description'}
          </label>
          <textarea
            className={
              !bookFormValidation.isDescriptionValid ? 'book-text-area book-error-input' :
                'book-text-area'
            }
            id='description'
            name='description'
            rows={5}
            draggable={false}
            placeholder='Enter description...'
            value={bookForm.description}
            onChange={({ currentTarget }: FormEvent<HTMLTextAreaElement>) => {
              handleOnChangeInput(currentTarget.value, 'description')
            }}
            onBlur={() => handleOnBlurInput('description', 'isDescriptionValid')}
            onFocus={
              () => {
                setBookFormValidation(bookFormValidation => {
                  return { ...bookFormValidation, isDescriptionValid: true }
                })
              }
            }
          />
        </div>
        <div className="book-form-fields">
          <div className="book-form-field">
            <label className={!bookFormValidation.isQuantityValid ? 'book-error-label' : ''}>
              {!bookFormValidation.isQuantityValid ? 'Please enter quantity' : 'Quantity'}
            </label>
            <input
              className={
                !bookFormValidation.isQuantityValid ? 'book-input book-error-input' : 'book-input'
              }
              type='number'
              placeholder='Enter quantity...'
              min={1}
              value={bookForm.quantity}
              onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
                handleOnChangeInput(currentTarget.value, 'quantity')
              }}
              onBlur={() => handleOnBlurInput('quantity', 'isQuantityValid')}
              onFocus={
                () => {
                  setBookFormValidation(bookFormValidation => {
                    return { ...bookFormValidation, isQuantityValid: true }
                  })
                }
              }
            />
          </div>
          <div className="book-form-field">
            <label className={!bookFormValidation.isReleaseDateValid ? 'book-error-label' : ''}>
              {!bookFormValidation.isReleaseDateValid ? 'Please enter release date' : 'Release date'}
            </label>
            <input
              className={
                !bookFormValidation.isReleaseDateValid ? 'book-input book-error-input' : 'book-input'
              }
              type='date'
              value={convertDateToInputDate(bookForm.releaseDate, 'yyyy-MM-dd')}
              onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
                handleOnChangeInput(currentTarget.value, 'releaseDate')
              }}
              onBlur={() => handleOnBlurInput('releaseDate', 'isReleaseDateValid')}
              onFocus={
                () => {
                  setBookFormValidation(bookFormValidation => {
                    return { ...bookFormValidation, isReleaseDateValid: true }
                  })
                }
              }
            />
          </div>
        </div>
        <div className="book-form-fields">
          <div className="book-form-field">
            <label className={!bookFormValidation.isSelectedAuthorsValid ? 'book-error-label' : ''}>
              {!bookFormValidation.isSelectedAuthorsValid ? 'Please enter an author' : 'Authors'}
            </label>
            <Select
              className={
                !bookFormValidation.isSelectedAuthorsValid ? 'book-author-select book-error-input' :
                  'book-author-select'
              }
              options={bookForm.authors}
              getOptionLabel={(option: Author) => `${option.FirstName} ${option.LastName}`}
              getOptionValue={(option: Author) => option.Id.toString()}
              value={bookForm.selectedAuthors}
              onChange={handleOnSelectedAuthorsChange}
              onFocus={
                () => {
                  setBookFormValidation(bookFormValidation => {
                    return { ...bookFormValidation, isSelectedAuthorsValid: true }
                  })
                }
              }
              isSearchable={true}
              maxMenuHeight={120}
              isMulti={true}
            />
            <button
              className='author-add-btn'
              type='button'
              onClick={handleShowAuthorModal}
            >
              + Add a new Author
            </button>
          </div>
          <div className="book-accordion" onClick={() => setShowAccordion(!showAccordion)}>
            <div className="book-accordion-item">
              <div className="book-accordion-title">
                <h4>Add an author</h4>
                <span>+</span>
              </div>
              <div
                className=
                  {
                    showAccordion ? 'book-accordion-content show' :
                      'book-accordion-content'
                  }
              >
                {
                  authorForm &&
                  authorFormValidation &&
                  setAuthorForm &&
                  setAuthorFormValidation &&
                  <AuthorForm
                    authorForm={authorForm}
                    authorFormValidation={authorFormValidation}
                    setAuthorForm={setAuthorForm}
                    setAuthorFormValidation={setAuthorFormValidation}
                    onSubmit={handleOnAuthorSubmit}
                  />}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default BookForm
