//react
import {useContext} from 'react'
import UserContext from '../../context/UserContext'
import {Link} from 'react-router-dom'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faBars } from '@fortawesome/free-solid-svg-icons'

//css
import NavbarCSS from './styles/Navbar.module.css'

function Navbar() {

  const {userData, setSidebar} = useContext(UserContext)

  return (
    <div className={`${NavbarCSS.navbar} ${NavbarCSS.navbarLoggedIn}`}>
      {userData?.name &&
        <button className={NavbarCSS.bars} onClick={() => setSidebar(true)}> 
          <div><FontAwesomeIcon icon={faBars}/></div>
        </button>
      }

      <div className={`${userData?.name ? NavbarCSS.flexboxContainerLoggedIn : NavbarCSS.flexboxContainerLoggedOut}`}>

        <Link to='/' className={NavbarCSS.item}>
          <div><FontAwesomeIcon icon={faEye} />Eye of Ophidia</div>
        </Link>

        <Link to='/events' className={NavbarCSS.item}>
          <div>Events</div>
        </Link>
        
        {(userData.privilege === 'admin' || userData.privilege === 'moderator' ) && (
          <>
            <Link to='/postmatch' className={NavbarCSS.item}>
              <div>Submit a new match!</div>
            </Link>
            <Link to='/postevent' className={NavbarCSS.item}>
              <div>Submit a new event</div>
            </Link>
            <Link to='/issuepage' className={NavbarCSS.item}>
              <div>Issues</div>
            </Link>
            <Link to='/users' className={NavbarCSS.item}>
              <div>Users</div>
            </Link>
            
          </>
        )}

        {userData.name && <>
          <Link to='/me' className={NavbarCSS.item}>
            <div>{userData.name}</div>
          </Link>
        </>}
      </div>
    </div>
  )
}
export default Navbar