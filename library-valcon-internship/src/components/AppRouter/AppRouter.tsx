import { Dispatch, SetStateAction } from 'react'

import { Route, Routes } from 'react-router-dom'

import Where from '../../models/Where'
import CreateBookPage from '../../pages/CreateBookPage/CreateBookPage'
import HomePage from '../../pages/HomePage/HomePage'
import SignIn from '../../pages/SignIn/SignIn'
import AdminPrivateRoutes from './AdminPrivateRoutes'
import PrivateRoutes from './PrivateRoutes'

interface AppRouterProps {
  token: string | null
  setToken: Dispatch<SetStateAction<string | null>>,
  search: string
  filter: Where[]
  sort: string[]
}

const AppRouter = ({ token, setToken, search, filter, sort }: AppRouterProps) => {
  return (
    <Routes>
      <Route element={<PrivateRoutes token={token} />}>
        <Route path='/profile' element={<HomePage search={search} filter={filter} sort={sort} />} />
        <Route path='/' element={<HomePage search={search} filter={filter} sort={sort} />} />
        <Route element={<AdminPrivateRoutes token={token} />}>
          <Route path='/create-book' element={<CreateBookPage />} />
        </Route>
      </Route>
      <Route path='/sign-in' element={<SignIn setToken={setToken} />} />
    </Routes>
  )
}

export default AppRouter
