import { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import { NavLink } from 'react-router-dom'

import addIcon from '../../assets/icons/add-icon.svg'
import BookList from '../../components/BookList/BookList'
import Book from '../../models/Book'
import { getBooks } from '../../services/BookService'
import './HomePage.css'

const HomePage = () => {
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ books, setBooks ] = useState<Book[]>([])
  const [ hasMoreBooks, setHasMoreBooks ] = useState(true)
  const fetchBooks = (pageNumber: number, pageLength: number) => {
    getBooks(pageNumber, 10)
      .then(response => {
        const totalCount = response.data.TotalCount
        const currentCount = pageNumber * pageLength
        setHasMoreBooks((totalCount - currentCount) > 0)
        setBooks(prevBooks => [ ...prevBooks, ...response.data.Items ])
      })
      .catch(() => {
        setBooks([])
      })
  }
  useEffect(() => {
    fetchBooks(pageNumber, 10)
  }, [ pageNumber ])
  const handleNextPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1)
  }
  return (
    <div className='homePage'>
      {
        books ?
          (
            <InfiniteScroll
              dataLength={books.length}
              next={handleNextPage}
              hasMore={hasMoreBooks}
              loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
              endMessage={<h4 style={{ textAlign: 'center' }}>You have browsed all books</h4>}
            >
              <BookList books={books} />
            </InfiniteScroll>
          )
          :
          <h3>No books currently available</h3>
      }
      <button className='fab'>
        <NavLink to='/create-book'>
          <img src={addIcon} alt='Add icon' />
        </NavLink>
      </button>
    </div>
  )
}

export default HomePage
