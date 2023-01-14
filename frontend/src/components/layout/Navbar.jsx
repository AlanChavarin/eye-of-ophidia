import {Link} from 'react-router-dom'
import NavbarCSS from './styles/Navbar.module.css'
import UserContext from '../../context/UserContext'
import {useContext} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

function Navbar() {

  const {userData} = useContext(UserContext)

  return (
    <div className={`${NavbarCSS.navbar}`}>
      <Link to='/' className={NavbarCSS.item}>
        <div><FontAwesomeIcon icon={faEye} />Eye of Ophidia</div>
      </Link>
      
      {(userData.name) ? (
        <>
          <Link to='/me' className={NavbarCSS.item}>
            <div>Me</div>
          </Link>
          <Link to='/postmatch' className={NavbarCSS.item}>
            <div>Submit a new match!</div>
          </Link>
          <Link to='/postevent' className={NavbarCSS.item}>
            <div>Submit a new event</div>
          </Link>
        </>
      ) : <>
        <Link to='/login' className={NavbarCSS.item}>
          <div>Login/Register</div>
        </Link>
      </>}
      
    </div>
  )
}
export default Navbar