import NavbarLink from '../NavbarLink/NavbarLink'
import './MobileSidebar.css'

interface MobileSidebarProps {
  isVisible: boolean
}

const MobileSidebar = ({ isVisible }: MobileSidebarProps) => {
  return (
    <div className={isVisible ? 'MobileSidebar' : 'MobileSidebar-hidden'}>
      <NavbarLink to='/' className='sidebar-link' color='#F56211'>
        Option 1
      </NavbarLink>
      <NavbarLink to='/' className='sidebar-link' color='#F56211'>
        Option 2
      </NavbarLink>
      <NavbarLink to='/' className='sidebar-link' color='#F56211'>
        Option 3
      </NavbarLink>
    </div>
  )
}

export default MobileSidebar
