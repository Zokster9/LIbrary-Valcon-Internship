import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'

import BookList from '../../components/BookList/BookList'
import Book from '../../models/Book'
import { getTopRentalBooks } from '../../services/RentService'
import { convertTopRentalBooksToBooks } from '../../utils/Utils'

const TopRentalBooksPage = () => {
  const [ books, setBooks ] = useState<Book[]>([])
  useEffect(() => {
    getTopRentalBooks(10)
      .then(response => {
        setBooks(convertTopRentalBooksToBooks(response.data))
      })
      .catch(() => {
        toast.error('Something went wrong!')
      })
  }, [])
  return (
    <div>
      <BookList books={books} />
    </div>
  )
}

export default TopRentalBooksPage
