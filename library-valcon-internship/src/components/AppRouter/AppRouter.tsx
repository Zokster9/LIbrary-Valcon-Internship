import { Dispatch, SetStateAction } from 'react'

import { Route, Routes } from 'react-router-dom'

import HomePage from '../../pages/HomePage/HomePage'
import SignIn from '../../pages/SignIn/SignIn'
import PrivateRoutes from './PrivateRoutes'

interface AppRouterProps {
  token: string | null
  setToken: Dispatch<SetStateAction<string | null>>
}

const AppRouter = ({ token, setToken }: AppRouterProps) => {
  return (
    <Routes>
      <Route element={<PrivateRoutes token={token} />}>
        <Route path='/profile' element={<HomePage />} />
        <Route path='/' element={<HomePage />} />
      </Route>
      <Route path='/sign-in' element={<SignIn setToken={setToken} />} />
    </Routes>
  )
}

export default AppRouter
