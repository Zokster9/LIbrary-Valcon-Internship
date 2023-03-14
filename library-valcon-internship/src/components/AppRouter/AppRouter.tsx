import { Dispatch, SetStateAction } from 'react'

import { Route, Routes } from 'react-router-dom'

import CreateBookPage from '../../pages/CreateBookPage/CreateBookPage'
import HomePage from '../../pages/HomePage/HomePage'
import SignIn from '../../pages/SignIn/SignIn'
import AdminPrivateRoutes from './AdminPrivateRoutes'
import PrivateRoutes from './PrivateRoutes'

interface AppRouterProps {
  token: string | null
  setToken: Dispatch<SetStateAction<string | null>>,
  search: string
}

const AppRouter = ({ token, setToken, search }: AppRouterProps) => {
  return (
    <Routes>
      <Route element={<PrivateRoutes token={token} />}>
        <Route path='/profile' element={<HomePage search={search} />} />
        <Route path='/' element={<HomePage search={search} />} />
        <Route element={<AdminPrivateRoutes token={token} />}>
          <Route path='/create-book' element={<CreateBookPage />} />
        </Route>
      </Route>
      <Route path='/sign-in' element={<SignIn setToken={setToken} />} />
    </Routes>
  )
}

export default AppRouter
