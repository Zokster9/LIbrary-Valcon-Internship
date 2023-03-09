import { Navigate, Outlet } from 'react-router-dom'

interface PrivateRoutesProps {
  token: string | null
}

const PrivateRoutes = ({ token }: PrivateRoutesProps) => {
  return token ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoutes
