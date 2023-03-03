import NavIcon from '../NavIcon/NavIcon'
import home from '../../assets/icons/home-icon.svg'
import profile from '../../assets/icons/profile-icon.svg'
import moreOptions from '../../assets/icons/more-options-icon.svg'
import './Footer.css'

const Footer = () => {
  return (
    <nav className='Footer'>
      <a className='footer-link' href=''>
        <NavIcon src={home} />
      </a>
      <a className='footer-link' href=''>
        <NavIcon src={profile} />
      </a>
      <a className='footer-link' href=''>
        <NavIcon src={moreOptions} />
      </a>
    </nav>
  )
}

export default Footer
