import { createRef, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Book from '../../models/Book'
import { deleteBook } from '../../services/BookService'
import BookCard from '../BookCard/BookCard'
import BookFormWrapper from '../BookFormWrapper/BookFormWrapper'
import DeleteBookDialog from '../DeleteBookDialog/DeleteBookDialog'
import './BookList.css'

interface BookListProps {
  books: Book[]
  token: string | null
}

const BookList = ({ books, token }: BookListProps) => {
  const [ book, setBook ] = useState<Book>()
  const [ showEditModal, setShowEditModal ] = useState(false)
  const dialogRef = createRef<HTMLDialogElement>()
  const navigate = useNavigate()
  const notifyBookCantBeDeleted = () => toast.warn('Book cannot be deleted! Return the books first')

  const handleEditBookDesktop = (bookForEdit: Book) => {
    setBook(bookForEdit)
    setShowEditModal(true)
  }
  const handleEditBookMobile = (bookId: number) => {
    navigate(`/edit-book/${bookId}`)
  }
  const handleDeleteBook = (bookForDeletion: Book) => {
    setBook(bookForDeletion)
    if (book) {
      if (book.Quantity === book.Available) {
        if (dialogRef)
          dialogRef.current?.showModal()
      } else {
        notifyBookCantBeDeleted()
      }
    }
  }

  const removeBook = () => {
    if (book)
      deleteBook(book.Id.toString())
        .then(() => {
          toast.success('Book successfully deleted!')
          navigate(`/books/${book.Id}`)
        })
        .catch(() => {
          toast.error('Something went wrong!')
        })
  }
  return (
    <div className="book-list">
      {
        books.map(book => {
          return (
            <BookCard
              key={book.Id}
              book={book}
              token={token}
              handleEditBookDesktop={handleEditBookDesktop}
              handleEditBookMobile={handleEditBookMobile}
              handleDeleteBook={handleDeleteBook}
            />
          )
        })
      }
      <DeleteBookDialog dialogRef={dialogRef} handleConfirm={removeBook} />
      {
        showEditModal &&
        <BookFormWrapper book={book} closeModal={() => setShowEditModal(false)} />
      }
    </div>
  )
}

export default BookList
