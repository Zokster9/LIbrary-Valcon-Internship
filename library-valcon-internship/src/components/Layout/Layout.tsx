import { useState } from 'react'

import { BrowserRouter } from 'react-router-dom'

import AppRouter from '../AppRouter/AppRouter'
import Header from '../Header/Header'
import MobileSidebar from '../MobileSidebar/MobileSidebar'
import Navbar from '../Navbar/Navbar'
import './Layout.css'

const Layout = () => {
  const [ token, setToken ] = useState(localStorage.getItem('token'))
  const [ isVisible, setIsVisible ] = useState(false)
  const handleMenuClick = () => {
    setIsVisible((currentState) => !currentState)
  }
  return (
    <div className='layout'>
      <BrowserRouter>
        <Header setToken={setToken} />
        <AppRouter token={token} setToken={setToken} />
        <MobileSidebar
          token={token}
          setToken={setToken}
          isVisible={isVisible}
          handleMenuClick={handleMenuClick}
        />
        <Navbar token={token} handleMenuClick={handleMenuClick} />
      </BrowserRouter>
    </div>
  )
}

export default Layout
