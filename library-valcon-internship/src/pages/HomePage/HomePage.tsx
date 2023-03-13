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
  const [ isEmptyResponse, setIsEmptyResponse ] = useState(false)
  useEffect(() => {
    getBooks(pageNumber, 10)
      .then(response => {
        setIsEmptyResponse(response.data.length === 0)
        setBooks(prevBooks => [ ...prevBooks, ...response.data ])
      })
      .catch(() => {
        setBooks([])
      })
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
              hasMore={!isEmptyResponse}
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
