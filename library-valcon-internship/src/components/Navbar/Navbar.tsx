import home from '../../assets/icons/home-icon.svg'
import profile from '../../assets/icons/profile-icon.svg'
import hamburgerMenuIcon from '../../assets/icons/hamburger-menu-icon.svg'
import NavbarLink from '../NavbarLink/NavbarLink'
import './Navbar.css'

interface FooterProps {
  handleMenuClick: () => void
}

const Navbar = ({ handleMenuClick }: FooterProps) => {
  return (
    <nav className='footer'>
      <NavbarLink className='footer-link' to='' color='#F56211'>
        <img src={home} alt='home-icon' />
      </NavbarLink>
      <NavbarLink className='footer-link' to='profile' color='#F56211'>
        <img src={profile} alt='profile-icon' />
      </NavbarLink>
      <button className='footer-link' onClick={() => handleMenuClick()}>
        <img src={hamburgerMenuIcon} alt='moreOptions-icon' />
      </button>
      <NavbarLink to='option1' className='footer-options-link' color='#F56211'>
        Option 1
      </NavbarLink>
      <NavbarLink to='option2' className='footer-options-link' color='#F56211'>
        Option 2
      </NavbarLink>
      <NavbarLink to='option3' className='footer-options-link' color='#F56211'>
        Option 3
      </NavbarLink>
    </nav>
  )
}

export default Navbar
