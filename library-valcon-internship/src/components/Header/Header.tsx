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
      <input className='header-search' type='text' placeholder='Search...' />
    </div>
  )
}

export default Header
