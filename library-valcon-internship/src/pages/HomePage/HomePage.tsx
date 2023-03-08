import { NavLink } from 'react-router-dom'

import addIcon from '../../assets/icons/add-icon.svg'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className='homePage'>
      <h3>No books currently available</h3>
      <button className='fab'>
        <NavLink to='/create-book'>
          <img src={addIcon} alt='Add icon' />
        </NavLink>
      </button>
    </div>
  )
}

export default HomePage
