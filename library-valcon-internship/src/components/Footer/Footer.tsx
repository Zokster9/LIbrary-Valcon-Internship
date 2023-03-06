import home from '../../assets/icons/home-icon.svg'
import profile from '../../assets/icons/profile-icon.svg'
import hamburgerMenuIcon from '../../assets/icons/hamburger-menu-icon.svg'
import './Footer.css'

interface FooterProps {
  handleMenuClick: () => void
}

const Footer = ({ handleMenuClick }: FooterProps) => {
  return (
    <nav className='Footer'>
      <a className='footer-link' href=''>
        <img src={home} alt='home-icon' />
      </a>
      <a className='footer-link' href=''>
        <img src={profile} alt='profile-icon' />
      </a>
      <button className='footer-link' onClick={() => handleMenuClick()}>
        <img src={hamburgerMenuIcon} alt='moreOptions-icon' />
      </button>
    </nav>
  )
}

export default Footer
