import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import BookFormWrapper from '../../components/BookFormWrapper/BookFormWrapper'
import Book from '../../models/Book'
import { getBookById } from '../../services/BookService'
import { convertBookIdResponseToBook } from '../../utils/Utils'
import './EditBookPage.css'

const EditBookPage = () => {
  const { bookId } = useParams()
  const [ book, setBook ] = useState<Book>()
  useEffect(() => {
    if (bookId)
      getBookById(bookId)
        .then(response => {
          setBook(convertBookIdResponseToBook(response.data))
        })
        .catch(error => console.warn(error))
  }, [ bookId ])
  return (
    <div className='edit-book-page'>
      {book && <BookFormWrapper book={book} />}
    </div>
  )
}

export default EditBookPage
