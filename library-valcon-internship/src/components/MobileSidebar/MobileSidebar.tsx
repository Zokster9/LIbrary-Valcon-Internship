import { useNavigate } from 'react-router-dom'

import NavbarLink from '../NavbarLink/NavbarLink'
import './MobileSidebar.css'

interface MobileSidebarProps {
  isVisible: boolean
}

const MobileSidebar = ({ isVisible }: MobileSidebarProps) => {
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('email')
  const handleSignOut = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    navigate('/')
  }
  return (
    <div className={isVisible ? 'mobileSidebar' : 'mobileSidebar-hidden'}>
      { !isLoggedIn ?
        <NavbarLink to='/sign-in' className='sidebar-link' color='#F56211'>
          Sign in
        </NavbarLink> :
        <button className='sidebar-link' onClick={handleSignOut}>
          Sign out
        </button>}
    </div>
  )
}

export default MobileSidebar
