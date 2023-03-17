import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import BookFormWrapper from '../../components/BookFormWrapper/BookFormWrapper'
import BookDetail from '../../models/BookDetail'
import { getBookById } from '../../services/BookService'
import './EditBookPage.css'

const EditBookPage = () => {
  const { bookId } = useParams()
  const [ book, setBook ] = useState<BookDetail>()
  useEffect(() => {
    getBookById(bookId)
      .then(response => {
        setBook(response.data)
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
