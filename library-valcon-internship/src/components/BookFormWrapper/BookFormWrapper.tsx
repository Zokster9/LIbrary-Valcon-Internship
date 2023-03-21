import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import AuthorFormType from '../../models/AuthorFormType'
import AuthorFormValidation from '../../models/AuthorFormValidation'
import Book from '../../models/Book'
import BookFormType from '../../models/BookFormType'
import BookFormValidation from '../../models/BookFormValidation'
import { addNewAuthor, getAllAuthors } from '../../services/AuthorService'
import { addNewBook, editBook } from '../../services/BookService'
import { BASE_64_EXTENSION, convertBase64ToBlob, initAuthorForm, initAuthorFormValidation, initBookForm, initBookFormValidation } from '../../utils/Utils'
import AuthorForm from '../AuthorForm/AuthorForm'
import BookForm from '../BookForm/BookForm'
import Modal from '../Modal/Modal'
import './BookFormWrapper.css'

interface BookFormWrapperProps {
  closeModal?: () => void
  book?: Book
  retrieveBook?: boolean
  setRetrieveBook?: Dispatch<SetStateAction<boolean>>
}

const BookFormWrapper = ({ closeModal, book, retrieveBook,  setRetrieveBook }: BookFormWrapperProps) => {
  const [ bookForm, setBookForm ] = useState<BookFormType>(initBookForm(book))
  const [ bookFormValidation, setBookFormValidation ] = useState<BookFormValidation>(initBookFormValidation())
  const [ authorForm, setAuthorForm ] = useState<AuthorFormType>(initAuthorForm())
  const [ authorFormValidation, setAuthorFormValidation ] = useState<AuthorFormValidation>(initAuthorFormValidation())

  const [ showAuthorModal, setShowAuthorModal ] = useState(false)
  const navigate = useNavigate()
  const handleShowAuthorModal = () => setShowAuthorModal(true)

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

  const handleOnBookSubmit = () => {
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
    if (bookForm.requestCover instanceof Blob) {
      formData.append('cover', bookForm.requestCover)
    } else {
      formData.append('cover', convertBase64ToBlob(BASE_64_EXTENSION + bookForm.requestCover))
    }
    formData.append('publishDate', bookForm.releaseDate.toISOString())
    bookForm.selectedAuthors.forEach(author => formData.append('authorIds', author.Id.toString()))
    if (book) {
      formData.append('Id', book.Id.toString())
      editBook(formData)
        .then(() => {
          if (retrieveBook !== undefined && setRetrieveBook)
            setRetrieveBook(!retrieveBook)
          toast.success('Successful book edit!')
          if (closeModal) {
            closeModal()
          }
          navigate(`/books/${book.Id}`)
        })
        .catch(() => {
          toast.error('Wrong book information!')
          setBookFormValidation(bookFormValidation => {
            return {
              ...bookFormValidation,
              isDataValid: false
            }
          })
        })
    } else {
      addNewBook(formData)
        .then(() => {
          toast.success('Book successfully added!')
          if (closeModal) {
            closeModal()
          } else {
            navigate('/')
          }
        })
        .catch(() => {
          toast.error('Wrong book information!')
          setBookFormValidation(bookFormValidation => {
            return {
              ...bookFormValidation,
              isDataValid: false
            }
          })
        })
    }
  }
  const handleOnAuthorSubmit = () => {
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
        toast.success('Author successfully added!')
        fetchAuthors()
        setAuthorForm({
          firstName: '',
          lastName: ''
        })
        setShowAuthorModal(false)
      })
      .catch(() => {
        toast.error('Wrong author information!')
        setAuthorFormValidation(authorFormValidation => {
          return {
            ...authorFormValidation,
            isAuthorDataValid: false
          }
        })
      })
  }

  return (
    <>
      {
        closeModal ?
          <Modal closeModal={closeModal} confirm={handleOnBookSubmit}>
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
              title={book ? 'Edit book' : 'Create a book'}
            />
          </Modal> :
          <>
            <BookForm
              bookForm={bookForm}
              bookFormValidation={bookFormValidation}
              setBookForm={setBookForm}
              setBookFormValidation={setBookFormValidation}
              handleOnBookSubmit={handleOnBookSubmit}
              title={book ? 'Edit book' : 'Create a book'}
              handleShowAuthorModal={handleShowAuthorModal}
            />
            <button
              className='book-wrapper-confirm-button'
              type='button'
              onClick={handleOnBookSubmit}
            >
              {book ? 'Confirm' : 'Create a book'}
            </button>
            {showAuthorModal &&
          <Modal closeModal={() => { setShowAuthorModal(false) }} confirm={handleOnAuthorSubmit}>
            <AuthorForm
              authorForm={authorForm}
              authorFormValidation={authorFormValidation}
              setAuthorForm={setAuthorForm}
              setAuthorFormValidation={setAuthorFormValidation}
              title='Add an author'
            />
          </Modal>
            }
          </>
      }
    </>
  )
}

export default BookFormWrapper
