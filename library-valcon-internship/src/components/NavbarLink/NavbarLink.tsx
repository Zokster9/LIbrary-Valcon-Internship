import { PropsWithChildren } from 'react'

import { NavLink } from 'react-router-dom'
import './NavbarLink.css'

interface NavbarLinkProps {
  to: string
  color: string
  className: string
}

const NavbarLink = ({ to, color, className, children }: PropsWithChildren<NavbarLinkProps>) => {
  return (
    <NavLink
      className={className}
      to={to}
      style={({ isActive }) => {
        return isActive ? { backgroundColor: color } : {}
      }}
    >
      {children}
    </NavLink>
  )
}

export default NavbarLink
