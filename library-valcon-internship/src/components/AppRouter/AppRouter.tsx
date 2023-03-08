import { Dispatch, SetStateAction } from 'react'

import { Route, Routes } from 'react-router-dom'

import CreateBookPage from '../../pages/CreateBookPage/CreateBookPage'
import HomePage from '../../pages/HomePage/HomePage'
import SignIn from '../../pages/SignIn/SignIn'
import AdminPrivateRoutes from './AdminPrivateRoutes'
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
        <Route element={<AdminPrivateRoutes token={token} />}>
          <Route path='/create-book' element={<CreateBookPage />} />
        </Route>
      </Route>
      <Route path='/sign-in' element={<SignIn setToken={setToken} />} />
    </Routes>
  )
}

export default AppRouter
