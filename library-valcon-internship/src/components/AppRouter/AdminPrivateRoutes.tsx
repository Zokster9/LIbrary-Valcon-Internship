import { Navigate, Outlet } from 'react-router-dom'

import Token from '../../models/Token'

interface AdminPrivateRoutesProps {
  token: string | null
}

const AdminPrivateRoutes = ({ token }: AdminPrivateRoutesProps) => {
  let jsonToken: Token
  let isAdmin = false
  if (token) {
    jsonToken = JSON.parse(token) as Token
    isAdmin = jsonToken.Role === 'Admin' || jsonToken.Role === 'Librarian'
  }
  return isAdmin ? <Outlet /> : <Navigate to='/' />
}

export default AdminPrivateRoutes
