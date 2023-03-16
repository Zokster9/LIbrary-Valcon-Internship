import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import BookDetail from '../../models/BookDetail'
import { getBookById } from '../../services/BookService'
import './BookDetailsPage.css'

const BookDetailsPage = () => {
  const [ book, setBook ] = useState<BookDetail>()
  const { bookId } = useParams()

  useEffect(() => {
    getBookById(bookId)
      .then(response => {
        setBook(response.data)
      })
      .catch(error => console.error(error))
  }, [ bookId ])

  return (
    <div className='book-details'>
      <h1>{book?.Authors[0].Firstname}</h1>
    </div>
  )
}

export default BookDetailsPage
