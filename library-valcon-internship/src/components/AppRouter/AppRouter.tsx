import { Route, Routes } from 'react-router-dom'

import HomePage from '../../pages/HomePage/HomePage'
import Login from '../../pages/Login/Login'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default AppRouter
