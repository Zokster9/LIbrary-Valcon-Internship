import { useState } from 'react'

import { BrowserRouter } from 'react-router-dom'

import { configureAxiosRequestInterceptors } from '../../services/AxiosConfiguration'
import AppRouter from '../AppRouter/AppRouter'
import Header from '../Header/Header'
import MobileSidebar from '../MobileSidebar/MobileSidebar'
import Navbar from '../Navbar/Navbar'
import './Layout.css'

const Layout = () => {
  const [ token, setToken ] = useState(localStorage.getItem('token'))
  const [ isVisible, setIsVisible ] = useState(false)
  const [ search, setSearch ] = useState('')
  configureAxiosRequestInterceptors()
  const handleMenuClick = () => {
    setIsVisible((currentState) => !currentState)
  }
  return (
    <div className='layout'>
      <BrowserRouter>
        <Header setToken={setToken} setSearch={setSearch} />
        <AppRouter token={token} setToken={setToken} search={search} />
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
