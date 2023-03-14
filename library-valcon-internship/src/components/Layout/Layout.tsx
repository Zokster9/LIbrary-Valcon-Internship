import { useState } from 'react'

import { BrowserRouter } from 'react-router-dom'

import Where from '../../models/Where'
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
  const [ filter, setFilter ] = useState<Where[]>([])
  const [ sort, setSort ] = useState<string[]>([])
  configureAxiosRequestInterceptors()
  const handleMenuClick = () => {
    setIsVisible((currentState) => !currentState)
  }
  return (
    <div className='layout'>
      <BrowserRouter>
        <Header setToken={setToken} setSearch={setSearch} setFilter={setFilter} setSort={setSort} />
        <AppRouter token={token} setToken={setToken} search={search} filter={filter} sort={sort} />
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
