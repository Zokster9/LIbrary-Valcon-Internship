import Book from '../../models/Book'
import BookCard from '../BookCard/BookCard'
import './BookList.css'

interface BookListProps {
  books: Book[]
}

const BookList = ({ books }: BookListProps) => {
  return (
    <div className="book-list">
      {books.map(book => <BookCard key={book.Id} book={book} />)}
    </div>
  )
}

export default BookList
