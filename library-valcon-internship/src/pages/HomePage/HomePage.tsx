import { useEffect, useRef, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import { NavLink } from 'react-router-dom'

import addIcon from '../../assets/icons/add-icon.svg'
import BookList from '../../components/BookList/BookList'
import Book from '../../models/Book'
import Where from '../../models/Where'
import { getBooks } from '../../services/BookService'
import './HomePage.css'

interface HomePageProps {
  search: string,
  filter: Where[]
}

const HomePage = ({ search, filter }: HomePageProps) => {
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ books, setBooks ] = useState<Book[]>([])
  const [ hasMoreBooks, setHasMoreBooks ] = useState(true)
  const pageLength = 10
  const currentSearch = useRef<string>(search)
  const currentFilter = useRef<Where[]>(filter)
  const fetchBooks = (pageNumber: number, pageLength: number, search: string, filter: Where[]) => {
    getBooks({ pageNumber, pageLength, search, filter })
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
  const resetPaging = () => {
    setBooks([])
    setPageNumber(1)
  }
  useEffect(() => {
    if (currentSearch.current !== search) {
      currentSearch.current = search
      resetPaging()
    } else if (currentFilter.current !== filter) {
      resetPaging()
      currentFilter.current = filter
    }
    fetchBooks(pageNumber, pageLength, search, filter)
  }, [ pageNumber, search, filter ])

  const handleNextPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1)
  }
  return (
    <div className='homePage'>
      {
        books.length > 0 ?
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
          <h3 style={{ textAlign: 'center' }}>No books currently available</h3>
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
