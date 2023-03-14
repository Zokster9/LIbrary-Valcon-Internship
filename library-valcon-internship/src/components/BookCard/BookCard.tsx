import placeholderBook from '../../assets/icons/placeholder-book.png'
import Book from '../../models/Book'
import './BookCard.css'

interface BookCardProps {
  book: Book
}

const BookCard = ({ book }: BookCardProps) => {
  let descriptionLength = 0
  if (book.Description) {
    descriptionLength = book.Description.length
    if (descriptionLength > 20) descriptionLength = 20
  }
  const publishDate = new Intl.DateTimeFormat('sr-RS').format(new Date(book.PublishDate))
  let author = ''
  if (book.Authors.length > 0) {
    if (book.Authors.length > 1) {
      author = `${book.Authors[0].FirstName} ${book.Authors[0].LastName}...`
    } else {
      author = `${book.Authors[0].FirstName} ${book.Authors[0].LastName}`
    }
  } else {
    author = 'Unknown'
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
      <div className="book-card-info">
        <h4 className='book-card-info-title'>Title:</h4>
        <p className='book-card-info-content'>{book.Title}</p>
      </div>
      <div className="book-card-info">
        <h4 className='book-card-info-title'>Description:</h4>
        <p className='book-card-info-content'>{descriptionLength ? book.Description.substring(0, descriptionLength) : 'No description'}...</p>
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
        <p className='book-card-info-content'>{author}
        </p>
      </div>
    </div>
  )
}

export default BookCard
