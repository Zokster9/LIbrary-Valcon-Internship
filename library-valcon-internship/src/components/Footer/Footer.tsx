import home from '../../assets/icons/home-icon.svg'
import profile from '../../assets/icons/profile-icon.svg'
import hamburgerMenuIcon from '../../assets/icons/hamburger-menu-icon.svg'
import './Footer.css'

const Footer = () => {
  return (
    <nav className='Footer'>
      <a className='footer-link' href=''>
        <img src={home} alt='home-icon' />
      </a>
      <a className='footer-link' href=''>
        <img src={profile} alt='profile-icon' />
      </a>
      <a className='footer-link' href=''>
        <img src={hamburgerMenuIcon} alt='moreOptions-icon' />
      </a>
    </nav>
  )
}

export default Footer
