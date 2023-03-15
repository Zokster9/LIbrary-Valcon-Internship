import placeholderBook from '../../assets/icons/placeholder-book.png'
import Book from '../../models/Book'
import './BookCard.css'

interface BookCardProps {
  book: Book
}

const BookCard = ({ book }: BookCardProps) => {
  const publishDate = new Intl.DateTimeFormat('sr-RS').format(new Date(book.PublishDate))
  let authors = ''
  if (book.Authors.length > 0) {
    authors = book.Authors.map((author) => `${author.FirstName} ${author.LastName}`).join(', ')
  } else {
    authors = 'Unknown'
  }
  return (
    <div className='book-card'>
      <img
        className='book-card-cover'
        src=
          {
            book.Cover ? 'data:image/png;base64,' + book.Cover : placeholderBook
          }
        alt='Book Cover'
      />
      <div className="book-card-title">
        <h2 className='hide' title={book.Title}>{book.Title}</h2>
      </div>
      <div className="book-card-description">
        <p className='hide'>
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
      <div className="book-card-info">
        <h4 className='book-card-info-title'>Authors:</h4>
        <p className='book-card-info-content hide'>{authors}
        </p>
      </div>
    </div>
  )
}

export default BookCard
