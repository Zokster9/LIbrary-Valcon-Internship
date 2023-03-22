import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'

import BookList from '../../components/BookList/BookList'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Book from '../../models/Book'
import { getTopRentalBooks } from '../../services/RentService'
import { convertTopRentalBooksToBooks } from '../../utils/Utils'

interface TopRentalBooksPageProps {
  token: string | null
}

const TopRentalBooksPage = ({ token }: TopRentalBooksPageProps) => {
  const [ books, setBooks ] = useState<Book[]>([])
  const [ isLoading, setIsLoading ] = useState(true)
  useEffect(() => {
    getTopRentalBooks(10)
      .then(response => {
        setBooks(convertTopRentalBooksToBooks(response.data))
        setIsLoading(false)
      })
      .catch(() => {
        toast.error('Something went wrong!')
      })
  }, [])
  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <BookList books={books} token={token} />
    </div>
  )
}

export default TopRentalBooksPage
