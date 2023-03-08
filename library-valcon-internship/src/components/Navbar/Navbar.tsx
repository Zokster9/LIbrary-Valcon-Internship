import hamburgerMenuIcon from '../../assets/icons/hamburger-menu-icon.svg'
import home from '../../assets/icons/home-icon.svg'
import profile from '../../assets/icons/profile-icon.svg'
import NavbarLink from '../NavbarLink/NavbarLink'
import './Navbar.css'

interface NavbarProps {
  handleMenuClick: () => void,
  token: string | null
}

const Navbar = ({ handleMenuClick, token }: NavbarProps) => {
  const isLoggedIn = token
  return (
    <nav className='navbar'>
      <NavbarLink className='navbar-link' to='' color='#F56211'>
        <img src={home} alt='home-icon' />
      </NavbarLink>
      {
        isLoggedIn &&
        <>
          <NavbarLink className='navbar-link' to='profile' color='#F56211'>
            <img src={profile} alt='profile-icon' />
          </NavbarLink>
          <button className='navbar-link' onClick={() => handleMenuClick()}>
            <img src={hamburgerMenuIcon} alt='moreOptions-icon' />
          </button>
          <NavbarLink to='option1' className='navbar-options-link' color='#F56211'>
            Option 1
          </NavbarLink>
          <NavbarLink to='option2' className='navbar-options-link' color='#F56211'>
            Option 2
          </NavbarLink>
          <NavbarLink to='option3' className='navbar-options-link' color='#F56211'>
            Option 3
          </NavbarLink>
        </>
      }
    </nav>
  )
}

export default Navbar
