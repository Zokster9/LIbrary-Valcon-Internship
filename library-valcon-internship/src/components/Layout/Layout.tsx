import { useState } from 'react'

import { BrowserRouter } from 'react-router-dom'

import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import MobileSidebar from '../MobileSidebar/MobileSidebar'
import './Layout.css'
import AppRouter from '../AppRouter/AppRouter'

const Layout = () => {
  const [ isVisible, setIsVisible ] = useState<boolean>(false)
  const handleMenuClick = () => {
    const visibility = !isVisible
    setIsVisible(visibility)
  }
  return (
    <div className='Layout'>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <MobileSidebar isVisible={isVisible} />
        <Navbar handleMenuClick={handleMenuClick} />
      </BrowserRouter>
    </div>
  )
}

export default Layout
