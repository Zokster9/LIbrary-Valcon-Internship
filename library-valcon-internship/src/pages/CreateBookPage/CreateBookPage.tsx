import { SyntheticEvent, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import AuthorForm from '../../components/AuthorForm/AuthorForm'
import BookForm from '../../components/BookForm/BookForm'
import Modal from '../../components/Modal/Modal'
import AuthorFormType from '../../models/AuthorFormType'
import AuthorFormValidation from '../../models/AuthorFormValidation'
import BookFormType from '../../models/BookFormType'
import BookFormValidation from '../../models/BookFormValidation'
import { addNewAuthor, getAllAuthors } from '../../services/AuthorService'
import { addNewBook } from '../../services/BookService'
import { convertAuthorsToAuthorDetails } from '../../utils/Utils'
import './CreateBookPage.css'

const CreateBookPage = () => {
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

  const [ retrieveAuthors, setRetrieveAuthors ] = useState(false)
  const [ show, setShow ] = useState(false)

  const handleShowAuthorModal = () => {
    setShow(true)
  }
  const navigate = useNavigate()
  const fetchAuthors = () => {
    getAllAuthors()
      .then(response => {
        setBookForm(bookForm => {
          return {
            ...bookForm,
            authors: convertAuthorsToAuthorDetails(response.data)
          }
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    fetchAuthors()
  }, [ retrieveAuthors ])

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
    setShow(false)
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
        navigate('/')
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
  return (
    <div className='create-book-page'>
      <BookForm
        bookForm={bookForm}
        bookFormValidation={bookFormValidation}
        setBookForm={setBookForm}
        setBookFormValidation={setBookFormValidation}
        handleOnBookSubmit={handleOnBookSubmit}
        title='Create a book'
        handleShowAuthorModal={handleShowAuthorModal}
      />
      {show &&
        <Modal closeModal={() => { setShow(false) }} confirm={handleOnAuthorSubmit}>
          <AuthorForm
            authorForm={authorForm}
            authorFormValidation={authorFormValidation}
            setAuthorForm={setAuthorForm}
            setAuthorFormValidation={setAuthorFormValidation}
            title='Add an author'
          />
        </Modal>
      }
    </div>
  )
}

export default CreateBookPage
