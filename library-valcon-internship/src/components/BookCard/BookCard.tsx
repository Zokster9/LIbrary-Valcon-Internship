import { MouseEvent } from 'react'

import { useNavigate } from 'react-router-dom'

import placeholderBook from '../../assets/icons/placeholder-book.png'
import Book from '../../models/Book'
import Token from '../../models/Token'
import { convertAuthorsToArrayString, convertDateToString } from '../../utils/Utils'
import './BookCard.css'

interface BookCardProps {
  book: Book
  token: string | null
  handleEditBookDesktop: (bookForEdit: Book) => void
  handleEditBookMobile: (bookId: number) => void
  handleDeleteBook: (bookForDeletion: Book) => void
}

const BookCard = ({ book, token, handleEditBookDesktop, handleEditBookMobile, handleDeleteBook }: BookCardProps) => {
  const publishDate = convertDateToString(book.PublishDate)
  const authors = convertAuthorsToArrayString(book.Authors)
  const navigate = useNavigate()
  const jsonToken: Token = JSON.parse(token ? token : '') as Token

  const handleOnCardClick = () => {
    navigate(`/books/${book.Id}`)
  }
  const handleEditDesktop = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    handleEditBookDesktop(book)
  }
  const handleEditMobile = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    handleEditBookMobile(book.Id)
  }
  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    handleDeleteBook(book)
  }
  return (
    <div className='book-card' onClick={handleOnCardClick}>
      <img
        className='book-card-cover'
        src=
          {
            book.Cover ? 'data:image/png;base64,' + book.Cover : placeholderBook
          }
        alt='Book Cover'
      />
      <div className="book-card-title">
        <h2 className='book-card-content book-card-title--hide' title={book.Title}>{book.Title}</h2>
      </div>
      <div className='book-card-description'>
        <p className='book-card-content book-card-description--hide'>
          {book.Description ? book.Description : 'No description'}
        </p>
      </div>
      <div className="book-card-info">
        <h4 className='book-card-content book-card-info-title'>ISBN:</h4>
        <p className='book-card-content book-card-info-content'>{book.Isbn}</p>
      </div>
      <div className="book-card-info">
        <h4 className='book-card-content book-card-info-title'>Publish date:</h4>
        <p className='book-card-content book-card-info-content'>
          {
            book.PublishDate ? publishDate : 'Unknown'
          }
        </p>
      </div>
      {
        book.RentCount ?
          <div className="book-card-info">
            <h4 className='book-card-info-title'>Rent count:</h4>
            <p className='book-card-info-content'>{book.RentCount}
            </p>
          </div> :
          <div className="book-card-info">
            <h4 className='book-card-content book-card-info-title'>Authors:</h4>
            <p className='book-card-content book-card-info-authors--hide'>{authors}
            </p>
          </div>
      }
      {
        !book.RentCount && jsonToken.Role !== 'User' &&
        jsonToken.Role !== 'User' &&
                <div className='book-card-btns'>
                  <button
                    type='button'
                    className='book-card-btn edit-btn edit-btn--desktop'
                    onClick={handleEditDesktop}
                  >
                  Edit
                  </button>
                  <button
                    type='button'
                    className='book-card-btn edit-btn edit-btn--mobile'
                    onClick={handleEditMobile}
                  >
                  Edit
                  </button>
                  <button
                    type='button'
                    className='book-card-btn delete-btn'
                    onClick={handleDelete}
                  >
                  Delete
                  </button>
                </div>
      }
    </div>
  )
}

export default BookCard
