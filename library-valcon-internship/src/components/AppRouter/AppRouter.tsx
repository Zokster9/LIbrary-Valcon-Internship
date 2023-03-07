import { Route, Routes } from 'react-router-dom'

import HomePage from '../../pages/HomePage/HomePage'
import SignIn from '../../pages/SignIn/SignIn'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/sign-in' element={<SignIn />} />
    </Routes>
  )
}

export default AppRouter
