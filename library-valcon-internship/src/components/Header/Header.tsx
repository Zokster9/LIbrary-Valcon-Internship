import { useEffect, useState } from 'react'
import './Header.css'

const Header = () => {
  const [ position, setPosition ] = useState(window.scrollY)
  const [ visible, setVisible ] = useState(true)
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
  return (
    <div className={'Header ' + visibilityClass}>
      <div className='header-search' >
        <input className='header-search-bar' type='text' placeholder='Search...' />
      </div>
      <div className='header-user'>
        <a className='header-btn' href='/'>
          Sign in
        </a>
        <a className='header-btn' href='/'>
          Sign out
        </a>
      </div>
    </div>
  )
}

export default Header
