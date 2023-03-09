import { Dispatch, SetStateAction } from 'react'

import { useNavigate } from 'react-router-dom'
import './MobileSidebar.css'

interface MobileSidebarProps {
  isVisible: boolean,
  token: string | null,
  setToken: Dispatch<SetStateAction<string | null>>,
  handleMenuClick: () => void
}

const MobileSidebar = ({ isVisible, token, setToken, handleMenuClick }: MobileSidebarProps) => {
  const navigate = useNavigate()
  const isLoggedIn = token
  const handleSignOut = () => {
    localStorage.removeItem('token')
    setToken(null)
    handleMenuClick()
    navigate('/')
  }
  return (
    <div className={isVisible && isLoggedIn ? 'mobileSidebar' : 'mobileSidebar-hidden'}>
      <button className='sidebar-link' onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  )
}

export default MobileSidebar
