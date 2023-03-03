import './NavIcon.css'

type NavIconProps = {
  src: string
}

const NavIcon = ({ src }: NavIconProps) => {
  return <img src={src} alt='icon' />
}

export default NavIcon
