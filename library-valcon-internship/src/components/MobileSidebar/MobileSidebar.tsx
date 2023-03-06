import './MobileSidebar.css'

interface MobileSidebarProps {
  isVisible: boolean
}

const MobileSidebar = ({ isVisible }: MobileSidebarProps) => {
  return (
    <div className={isVisible ? 'MobileSidebar' : 'MobileSidebar-hidden'}>
      <a href='/' className='sidebar-link'>
        Option 1
      </a>
      <a href='/' className='sidebar-link'>
        Option 2
      </a>
      <a href='/' className='sidebar-link'>
        Option 3
      </a>
    </div>
  )
}

export default MobileSidebar
