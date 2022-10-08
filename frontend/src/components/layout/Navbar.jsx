import {Link} from 'react-router-dom'
import './styles/Navbar.css'
import UserContext from '../../context/UserContext'
import {useContext} from 'react'

function Navbar() {

  const {userData} = useContext(UserContext)

  return (
    <div className='navbar-parent'>
      <Link className='navbar-grid-item navbar-title' to='/'>
        <div>Eye of Ophidia</div>
      </Link>
      <Link className='navbar-grid-item navbar-title' to='/login'>
        <div>Login/Register</div>
      </Link>
      {(userData.name) ? (
        <>
          <Link className='navbar-grid-item navbar-title' to='/me'>
            <div>Me</div>
          </Link>
          <Link className='navbar-grid-item navbar-title' to='/logout'>
            <div>Logout</div>
          </Link>
        </>
      ) : <></>}
      
    </div>
  )
}
export default Navbar