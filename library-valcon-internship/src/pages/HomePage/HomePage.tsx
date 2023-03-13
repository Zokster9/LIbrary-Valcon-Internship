import { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

import addIcon from '../../assets/icons/add-icon.svg'
import BookList from '../../components/BookList/BookList'
import Book from '../../models/Book'
import { getBooks } from '../../services/BookService'
import './HomePage.css'

const HomePage = () => {
  const [ books, setBooks ] = useState<Book[] | null>(null)
  useEffect(() => {
    getBooks(1, 5)
      .then(response => {
        setBooks(response.data)
      })
      .catch(() => {
        setBooks(null)
      })
  }, [])
  return (
    <div className='homePage'>
      {
        books ?
          <BookList books={books} /> :
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
