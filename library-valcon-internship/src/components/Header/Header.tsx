import { useEffect, useState } from 'react'

import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [ position, setPosition ] = useState(window.scrollY)
  const [ visible, setVisible ] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const isSearchVisible = location.pathname === '/'
  const isLoggedIn = localStorage.getItem('token')
  useEffect(() => {
    const handleScroll = () => {
      const moving = window.scrollY
      setVisible(position > moving)
      setPosition(moving)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [ position ])
  const visibilityClass = visible ? 'visible' : 'hidden'
  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div className={'header ' + visibilityClass}>
      <div className={isSearchVisible ? 'header-search' : 'hide-search'} >
        <input className='header-search-bar' type='text' placeholder='Search...' />
      </div>
      <div className='header-user'>
        { !isLoggedIn ?
          <button className="header-btn">
            <NavLink className='header-link' to='/sign-in'>
              Sign in
            </NavLink>
          </button> :
          <button className='header-btn' onClick={handleSignOut}>
            Sign out
          </button>}
      </div>
    </div>
  )
}

export default Header
