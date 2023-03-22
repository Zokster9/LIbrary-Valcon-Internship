import { useState } from 'react'

import hamburgerMenuIcon from '../../assets/icons/hamburger-menu-icon.svg'
import home from '../../assets/icons/home-icon.svg'
import Token from '../../models/Token'
import BookFormWrapper from '../BookFormWrapper/BookFormWrapper'
import NavbarLink from '../NavbarLink/NavbarLink'
import './Navbar.css'

interface NavbarProps {
  handleMenuClick: () => void,
  token: string | null
}

const Navbar = ({ handleMenuClick, token }: NavbarProps) => {
  const [ showAddBookModal, setShowAddBookModal ] = useState(false)
  const isLoggedIn = token
  const jsonToken: Token | null = token ? JSON.parse(token) as Token : null
  return isLoggedIn ? (
    <nav className='navbar'>
      <NavbarLink className='navbar-link' to='' color='#8C6E1B'>
        <img src={home} alt='home-icon' />
      </NavbarLink>
      <button className='navbar-link' onClick={() => handleMenuClick()}>
        <img src={hamburgerMenuIcon} alt='moreOptions-icon' />
      </button>
      <NavbarLink to='top-rental-books' className='navbar-options-link' color='#8C6E1B'>
            Top 10 Rental Books
      </NavbarLink>
      {
        jsonToken?.Role !== 'User' &&
        <>
          <button className='navbar-options-link' onClick={() => setShowAddBookModal(true)}>
            Add a new book
          </button>
          {showAddBookModal &&
            <BookFormWrapper closeModal={() => setShowAddBookModal(false)} />
          }
        </>
      }
    </nav>
  ) : (
    <></>
  )
}

export default Navbar
