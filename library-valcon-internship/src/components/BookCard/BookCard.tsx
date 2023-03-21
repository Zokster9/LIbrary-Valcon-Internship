import { useNavigate } from 'react-router-dom'

import placeholderBook from '../../assets/icons/placeholder-book.png'
import Book from '../../models/Book'
import { convertAuthorsToArrayString, convertDateToString } from '../../utils/Utils'
import './BookCard.css'

interface BookCardProps {
  book: Book
}

const BookCard = ({ book }: BookCardProps) => {
  const publishDate = convertDateToString(book.PublishDate)
  const authors = convertAuthorsToArrayString(book.Authors)
  const navigate = useNavigate()
  const handleOnCardClick = () => {
    navigate(`/books/${book.Id}`)
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
        <h2 className='book-card-title--hide' title={book.Title}>{book.Title}</h2>
      </div>
      <div className="book-card-description">
        <p className='book-card-description--hide'>
          {book.Description ? book.Description : 'No description'}
        </p>
      </div>
      <div className="book-card-info">
        <h4 className='book-card-info-title'>ISBN:</h4>
        <p className='book-card-info-content'>{book.Isbn}</p>
      </div>
      <div className="book-card-info">
        <h4 className='book-card-info-title'>Publish date:</h4>
        <p className='book-card-info-content'>
          {
            book.PublishDate ? publishDate : 'Unknown'
          }
        </p>
      </div>
      {
        book.RentCount ?
          <div className="book-card-info">
            <h4 className='book-card-info-title'>Rent count:</h4>
            <p className='book-card-info-content--hide'>{book.RentCount}
            </p>
          </div> :
          <div className="book-card-info">
            <h4 className='book-card-info-title'>Authors:</h4>
            <p className='book-card-info-content--hide'>{authors}
            </p>
          </div>
      }
    </div>
  )
}

export default BookCard
