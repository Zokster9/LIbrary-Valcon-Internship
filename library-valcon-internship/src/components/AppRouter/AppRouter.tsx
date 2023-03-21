import { Dispatch, SetStateAction } from 'react'

import { Route, Routes } from 'react-router-dom'

import Where from '../../models/Where'
import BookDetailsPage from '../../pages/BookDetailsPage/BookDetailsPage'
import CreateBookPage from '../../pages/CreateBookPage/CreateBookPage'
import EditBookPage from '../../pages/EditBookPage/EditBookPage'
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
        <Route path='/profile' element={<HomePage token={token} search={search} filter={filter} sort={sort} />} />
        <Route path='/' element={<HomePage token={token} search={search} filter={filter} sort={sort} />} />
        <Route path='/books/:bookId' element={<BookDetailsPage />} />
        <Route element={<AdminPrivateRoutes token={token} />}>
          <Route path='/create-book' element={<CreateBookPage />} />
          <Route path='/edit-book/:bookId' element={<EditBookPage />} />
        </Route>
      </Route>
      <Route path='/sign-in' element={<SignIn setToken={setToken} />} />
    </Routes>
  )
}

export default AppRouter
