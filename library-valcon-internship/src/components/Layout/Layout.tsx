import { useState } from 'react'

import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import MobileSidebar from '../MobileSidebar/MobileSidebar'
import './Layout.css'

const Layout = () => {
  const [ isVisible, setIsVisible ] = useState<boolean>(false)
  const handleMenuClick = () => {
    const visibility = !isVisible
    setIsVisible(visibility)
  }
  return (
    <div className='Layout'>
      <Header />
      <div className='card'>Insert screens here</div>
      <MobileSidebar isVisible={isVisible} />
      <Navbar handleMenuClick={handleMenuClick} />
    </div>
  )
}

export default Layout
