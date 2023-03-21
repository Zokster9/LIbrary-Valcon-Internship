import { createRef, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import placeholder from '../../assets/icons/placeholder-book.png'
import BookAvailableMessage from '../../components/BookAvailableMessage/BookAvailableMessage'
import BookFormWrapper from '../../components/BookFormWrapper/BookFormWrapper'
import DeleteBookDialog from '../../components/DeleteBookDialog/DeleteBookDialog'
import RentHistoryTable from '../../components/RentHistoryTable/RentHistoryTable'
import Book from '../../models/Book'
import Token from '../../models/Token'
import { deleteBook, getBookById } from '../../services/BookService'
import { rentBook } from '../../services/RentService'
import { convertAuthorsToArrayString, convertBookIdResponseToBook, convertDateToString } from '../../utils/Utils'
import './BookDetailsPage.css'

const BookDetailsPage = () => {
  const [ book, setBook ] = useState<Book>()
  const [ publishDate, setPublishDate ] = useState('')
  const [ authors, setAuthors ] = useState('')
  const [ showModal, setShowModal ] = useState(false)
  const [ retrieveBook, setRetrieveBook ] = useState(false)
  const [ retrieveBookHistory, setRetrieveBookHistory ] = useState(false)
  const { bookId } = useParams()
  const navigate = useNavigate()
  const notifyBookCantBeDeleted = () => toast.warn('Book cannot be deleted! Return the books first')
  const notifyBookCantBeRented = () => toast.warn('Book cannot be rented! There are no available copies!')
  const notifyBookRented = () => toast.success('Book successfully rented!')
  const notifyBookRentFailed = () => toast.error('Something went wrong!')
  const dialogRef = createRef<HTMLDialogElement>()
  const stringToken = localStorage.getItem('token')
  const token: Token = JSON.parse(stringToken ? stringToken : '') as Token

  useEffect(() => {
    if (bookId)
      getBookById(bookId)
        .then(response => {
          setBook(convertBookIdResponseToBook(response.data))
        })
        .catch(error => console.error(error))
  }, [ bookId, retrieveBook ])

  useEffect(() => {
    if (book) {
      setPublishDate(convertDateToString(book.PublishDate))
      setAuthors(convertAuthorsToArrayString(book.Authors))
    }
  }, [ book ])

  const handleCloseModal = () => setShowModal(false)

  const handleDeleteBook = () => {
    if (book?.Quantity === book?.Available) {
      if (dialogRef)
        dialogRef.current?.showModal()
    } else {
      notifyBookCantBeDeleted()
    }
  }
  const handleRentBook = () => {
    if (!bookId || !book) return
    if (book.Available > 0) {
      rentBook(bookId)
        .then(() => {
          setRetrieveBook(!retrieveBook)
          setRetrieveBookHistory(!retrieveBookHistory)
          notifyBookRented()
        })
        .catch(() => {
          notifyBookRentFailed()
        })
    } else {
      notifyBookCantBeRented()
    }
  }

  const removeBook = () => {
    if (bookId)
      deleteBook(bookId)
        .then(() => {
          navigate('/')
        })
        .catch(error => {
          console.error(error)
        })
  }

  return (
    <div className='book-details'>
      <div className='book-details-main'>
        <div className='book-details-cover-section'>
          <img
            className='book-details-cover'
            src={book?.Cover ? 'data:image/png;base64,' + book.Cover : placeholder}
            alt='Book cover'
          />
        </div>
        <div className='book-details-main-content'>
          <h1 className='book-details-title'>{book?.Title}</h1>
          <p className='book-details-description'>
            {book?.Description}
          </p>
          <BookAvailableMessage isAvailable={book?.Available !== 0} />
          {
            token.Role !== 'User' &&
              <div className='book-details-fields'>
                <div className='book-details-field'>
                  <label className='book-details-label'>Quantity</label>
                  <h3>{book?.Quantity}</h3>
                </div>
                <div className='book-details-field'>
                  <label className='book-details-label'>Available</label>
                  <h3>{book?.Available}</h3>
                </div>
              </div>
          }
          <div className='book-details-fields'>
            <div className='book-details-field'>
              <label className='book-details-label'>ISBN</label>
              <h3>{book?.Isbn}</h3>
            </div>
            <div className='book-details-field'>
              <label className='book-details-label'>Publish date</label>
              <h3>{publishDate}</h3>
            </div>
          </div>
          <div className='book-details-field'>
            <label className='book-details-label'>Authors</label>
            <h3>{authors}</h3>
          </div>
          <div className='book-details-actions-field'>
            {
              token.Role !== 'Librarian' &&
              <button
                type='button'
                className='book-details-btn rent'
                onClick={handleRentBook}
              >
                Rent the book
              </button>
            }
            {
              token.Role !== 'User' &&
              <>
                <button
                  type='button'
                  className='book-details-btn edit desktop'
                  onClick={() => setShowModal(true)}
                >
                Edit book
                </button>
                <button
                  type='button'
                  className='book-details-btn edit mobile'
                  onClick={() => navigate(`/edit-book/${bookId ? bookId : ''}`)}
                >
                  Edit book
                </button>
                <button
                  type='button'
                  className='book-details-btn delete'
                  onClick={handleDeleteBook}
                >
                  Delete book
                </button>
              </>
            }
          </div>
        </div>
      </div>
      <DeleteBookDialog dialogRef={dialogRef} handleConfirm={removeBook} />
      {showModal &&
        <BookFormWrapper retrieveBook={retrieveBook} setRetrieveBook={setRetrieveBook} book={book} closeModal={handleCloseModal} />
      }
      {
        token.Role !== 'User' &&
        <RentHistoryTable
          bookId={bookId}
          retrieveBook={retrieveBook}
          setRetrieveBook={setRetrieveBook}
          retrieveBookHistory={retrieveBookHistory}
        />
      }
    </div>
  )
}

export default BookDetailsPage
