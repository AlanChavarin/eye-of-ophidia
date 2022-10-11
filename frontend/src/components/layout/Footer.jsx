import {useContext} from 'react'
import UserContext from '../../context/UserContext'
import './styles/Footer.css'
import {Link} from 'react-router-dom'

function Footer() {
  const {userData} = useContext(UserContext)

  return (
    <div className='footer-parent'>
      <div className='footer-item footer-copyright'>
        Copyright Alan Chavarin
      </div>
      <div className='footer-item footer-userdata'>
        {(userData?.name) ? 
        <>
          <div>
            Name: {userData.name}
          </div>
          <div>
            Email: {userData.email}
          </div>
        </> : <></>}
      </div>
      {(userData?.name) ? <>
        <Link className='navbar-grid-item navbar-title' to='/logout'>
          <div>Logout</div>
        </Link>
      </> : <></>}
      
    </div>
  )
}
export default Footer