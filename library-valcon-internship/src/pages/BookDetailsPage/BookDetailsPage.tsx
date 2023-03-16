import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import placeholder from '../../assets/icons/placeholder-book.png'
import BookAvailableMessage from '../../components/BookAvailableMessage/BookAvailableMessage'
import BookDetail from '../../models/BookDetail'
import Token from '../../models/Token'
import { getBookById } from '../../services/BookService'
import { convertAuthorDetailsToArrayString, convertDateToString } from '../../utils/Utils'
import './BookDetailsPage.css'

const BookDetailsPage = () => {
  const [ book, setBook ] = useState<BookDetail>()
  const [ publishDate, setPublishDate ] = useState('')
  const [ authors, setAuthors ] = useState('')
  const { bookId } = useParams()
  const stringToken = localStorage.getItem('token')
  const token: Token = JSON.parse(stringToken ? stringToken : '') as Token

  useEffect(() => {
    getBookById(bookId)
      .then(response => {
        setBook(response.data)
      })
      .catch(error => console.error(error))
  }, [ bookId ])

  useEffect(() => {
    if (book) {
      setPublishDate(convertDateToString(book.PublishDate))
      setAuthors(convertAuthorDetailsToArrayString(book.Authors))
    }
  }, [ book ])

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
          <textarea
            className='book-details-description'
            value={book?.Description}
            contentEditable={false}
            readOnly={true}
            draggable={false}
            rows={6}
          />
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
              <h3>{book?.ISBN}</h3>
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
          <div className='book-details-admin-field'>
            <button type='button' className='book-details-btn edit'>Edit book</button>
            <button type='button' className='book-details-btn delete'>Delete book</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailsPage
