import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  const token = false
  return token ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoutes
