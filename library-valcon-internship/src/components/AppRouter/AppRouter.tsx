import { Dispatch, SetStateAction } from 'react'

import { Route, Routes } from 'react-router-dom'

import HomePage from '../../pages/HomePage/HomePage'
import SignIn from '../../pages/SignIn/SignIn'
import PrivateRoutes from './PrivateRoutes'

interface AppRouterProps {
  setToken: Dispatch<SetStateAction<string | null>>
}

const AppRouter = ({ setToken }: AppRouterProps) => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path='/profile' element={<HomePage />} />
      </Route>
      <Route path='/' element={<HomePage />} />
      <Route path='/sign-in' element={<SignIn setToken={setToken} />} />
    </Routes>
  )
}

export default AppRouter
