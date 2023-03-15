import { SyntheticEvent, useEffect, useState } from 'react'

import ReactDOM from 'react-dom'

import AuthorFormType from '../../../models/AuthorFormType'
import AuthorFormValidation from '../../../models/AuthorFormValidation'
import BookFormType from '../../../models/BookFormType'
import BookFormValidation from '../../../models/BookFormValidation'
import { addNewAuthor, getAllAuthors } from '../../../services/AuthorService'
import { addNewBook } from '../../../services/BookService'
import BookForm from '../../BookForm/BookForm'
import '../Modals.css'
import './ModalAddBook.css'

interface AddBookProps {
  show: boolean
  closeModal: () => void
}

const ModalAddBook = ({ show, closeModal }: AddBookProps) => {
  const [ bookForm, setBookForm ] = useState<BookFormType>({
    requestCover: new Blob(),
    cover: '',
    title: '',
    description: '',
    isbn: '',
    quantity: '',
    releaseDate: null,
    selectedAuthors: [],
    authors: []
  })
  const [ bookFormValidation, setBookFormValidation ] = useState<BookFormValidation>({
    isTitleValid: true,
    isDescriptionValid: true,
    isIsbnValid: true,
    isQuantityValid: true,
    isReleaseDateValid: true,
    isSelectedAuthorsValid: true,
    isDataValid: true
  })
  const [ authorForm, setAuthorForm ] = useState<AuthorFormType>({
    firstName: '',
    lastName: ''
  })
  const [ authorFormValidation, setAuthorFormValidation ] = useState<AuthorFormValidation>({
    isFirstNameValid: true,
    isLastNameValid: true,
    isAuthorDataValid: true
  })

  const fetchAuthors = () => {
    getAllAuthors()
      .then(response => {
        setBookForm(bookForm => {
          return {
            ...bookForm,
            authors: response.data
          }
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    fetchAuthors()
  }, [])

  if (!show) return null

  const handleOnBookSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (bookForm.title.trim() === '') {
      setBookFormValidation(bookFormValidation => {
        return {
          ...bookFormValidation,
          isTitleValid: false
        }
      })
      return
    }
    if (bookForm.description.trim() === '') {
      setBookFormValidation(bookFormValidation => {
        return {
          ...bookFormValidation,
          isDescriptionValid: false
        }
      })
      return
    }
    if (Number.parseInt(bookForm.quantity.trim()) < 1) {
      setBookFormValidation(bookFormValidation => {
        return {
          ...bookFormValidation,
          isQuantityValid: false
        }
      })
      return
    }
    const isbnRegex = new RegExp('^(?=(?:\\D*\\d){10}(?:(?:\\D*\\d){3})?$)[\\d-]+$')
    if (bookForm.isbn.trim() === '' || !isbnRegex.test(bookForm.isbn)) {
      setBookFormValidation(bookFormValidation => {
        return {
          ...bookFormValidation,
          isIsbnValid: false
        }
      })
      return
    }
    if (!bookForm.releaseDate) {
      setBookFormValidation(bookFormValidation => {
        return {
          ...bookFormValidation,
          isReleaseDateValid: false
        }
      })
      return
    }
    if (bookForm.selectedAuthors.length === 0) {
      setBookFormValidation(bookFormValidation => {
        return {
          ...bookFormValidation,
          isSelectedAuthorsValid: false
        }
      })
      return
    }

    const formData = new FormData()
    formData.append('title', bookForm.title.trim())
    formData.append('description', bookForm.description.trim())
    formData.append('isbn', bookForm.isbn.trim())
    formData.append('quantity', bookForm.quantity.trim())
    formData.append('cover', bookForm.requestCover)
    formData.append('publishDate', bookForm.releaseDate.toISOString())
    bookForm.selectedAuthors.forEach(author => formData.append('authorIds', author.Id.toString()))
    addNewBook(formData)
      .then(() => {
        closeModal()
      })
      .catch(() => {
        setBookFormValidation(bookFormValidation => {
          return {
            ...bookFormValidation,
            isDataValid: false
          }
        })
      })
  }
  const handleOnAuthorSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
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
        fetchAuthors()
        setAuthorForm({
          firstName: '',
          lastName: ''
        })
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

  return ReactDOM.createPortal(
    <div className='modal'>
      <div className='overlay' onClick={closeModal} />
      <div className='content'>
        <div className='add-book-modal'>
          <BookForm
            bookForm={bookForm}
            bookFormValidation={bookFormValidation}
            authorForm={authorForm}
            authorFormValidation={authorFormValidation}
            setBookForm={setBookForm}
            setBookFormValidation={setBookFormValidation}
            setAuthorForm={setAuthorForm}
            setAuthorFormValidation={setAuthorFormValidation}
            handleOnBookSubmit={handleOnBookSubmit}
            handleOnAuthorSubmit={handleOnAuthorSubmit}
            title='Create a book'
          />
          <button
            type='button'
            className='add-book-close-modal'
            onClick={closeModal}
          >
              Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  )
}

export default ModalAddBook
