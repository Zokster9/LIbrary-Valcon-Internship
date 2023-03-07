import NavbarLink from '../NavbarLink/NavbarLink'
import './MobileSidebar.css'

interface MobileSidebarProps {
  isVisible: boolean
}

const MobileSidebar = ({ isVisible }: MobileSidebarProps) => {
  return (
    <div className={isVisible ? 'mobileSidebar' : 'mobileSidebar-hidden'}>
      <NavbarLink to='/sign-in' className='sidebar-link' color='#F56211'>
        Sign in
      </NavbarLink>
    </div>
  )
}

export default MobileSidebar
