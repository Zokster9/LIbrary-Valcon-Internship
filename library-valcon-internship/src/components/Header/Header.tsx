import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
  setToken: Dispatch<SetStateAction<string | null>>
}

const Header = ({ setToken }: HeaderProps) => {
  const [ position, setPosition ] = useState(window.scrollY)
  const [ visible, setVisible ] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('token')
  const isSearchVisible = location.pathname === '/' && isLoggedIn
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
    setToken(null)
    navigate('/')
  }
  return (
    <div className={'header ' + visibilityClass}>
      <div className={isSearchVisible ? 'header-search' : 'hide-search'} >
        <input className='header-search-bar' type='text' placeholder='Search...' />
      </div>
      <div className='header-user'>
        { isLoggedIn &&
          <button className='header-btn' onClick={handleSignOut}>
            Sign out
          </button>}
      </div>
    </div>
  )
}

export default Header
