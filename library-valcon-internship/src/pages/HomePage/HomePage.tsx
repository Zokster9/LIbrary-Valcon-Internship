import { useEffect, useRef, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import { NavLink } from 'react-router-dom'

import addIcon from '../../assets/icons/add-icon.svg'
import BookList from '../../components/BookList/BookList'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Book from '../../models/Book'
import Token from '../../models/Token'
import Where from '../../models/Where'
import { getBooks } from '../../services/BookService'
import { convertBooksPagedResponseToBooks } from '../../utils/Utils'
import './HomePage.css'

interface HomePageProps {
  search: string,
  filter: Where[]
  sort: string[]
  token: string | null
}

interface Page {
  pageNumber: number
  pageLength: number
  totalCount: number
}

const HomePage = ({ search, filter, sort, token }: HomePageProps) => {
  const [ page, setPage ] = useState<Page>({
    pageNumber: 1,
    pageLength: 10,
    totalCount: -1
  })
  const [ books, setBooks ] = useState<Book[]>([])
  const [ hasMoreBooks, setHasMoreBooks ] = useState(true)
  const [ isLoading, setIsLoading ] = useState(true)
  const currentSearch = useRef<string>(search)
  const currentFilter = useRef<Where[]>(filter)
  const currentSort = useRef<string[]>(sort)
  const jsonToken: Token | null = token ? JSON.parse(token) as Token : null

  const fetchBooks = (pageNumber: number, pageLength: number, search: string, filter: Where[], sort: string[]) => {
    setIsLoading(true)
    getBooks({ pageNumber, pageLength, search, filter, sort })
      .then(response => {
        const totalNumOfBooks = response.data.TotalCount
        const currentCount = pageNumber * pageLength
        const newBooks = convertBooksPagedResponseToBooks(response.data.Items)
        setHasMoreBooks((totalNumOfBooks - currentCount) > 0)
        setPage(page => {
          return {
            ...page,
            totalCount: totalNumOfBooks
          }
        })
        setBooks(prevBooks => [ ...prevBooks, ...newBooks ])
        setIsLoading(false)
      })
      .catch(() => {
        setBooks([])
        setIsLoading(false)
      })
  }
  const resetPaging = () => {
    setPage(page => {
      return {
        ...page,
        totalCount: -1,
        pageNumber: 1
      }
    })
    setHasMoreBooks(true)
    setBooks([])
  }
  useEffect(() => {
    if (currentSearch.current !== search) {
      currentSearch.current = search
      resetPaging()
    } else if (currentFilter.current !== filter) {
      resetPaging()
      currentFilter.current = filter
    } else if (currentSort.current !== sort) {
      resetPaging()
      currentSort.current = sort
    }
    fetchBooks(page.pageNumber, page.pageLength, search, filter, sort)
  }, [ page.pageNumber, page.pageLength, search, filter, sort ])

  const handleNextPage = () => {
    setPage(page => {
      return {
        ...page,
        pageNumber: page.pageNumber + 1
      }
    })
  }
  return (
    <div className='homePage'>
      {
        page.totalCount !== 0 ?
          (
            <InfiniteScroll
              dataLength={books.length}
              next={handleNextPage}
              hasMore={hasMoreBooks}
              loader={<>{isLoading && <LoadingSpinner />}</>}
              endMessage={<h4 style={{ textAlign: 'center', marginTop: 30 }}>You have browsed all books</h4>}
            >
              <BookList books={books} token={token} />
            </InfiniteScroll>
          )
          :
          <h3 style={{ textAlign: 'center' }}>No books currently available</h3>
      }
      {
        jsonToken?.Role !== 'User' &&
        <button className='fab'>
          <NavLink to='/create-book'>
            <img src={addIcon} alt='Add icon' />
          </NavLink>
        </button>
      }
    </div>
  )
}

export default HomePage
