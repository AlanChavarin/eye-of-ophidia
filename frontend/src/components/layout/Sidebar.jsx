//react
import {useContext, useEffect} from 'react'
import UserContext from '../../context/UserContext'
import {Link} from 'react-router-dom'

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faEye } from '@fortawesome/free-solid-svg-icons'

//css
import SidebarCSS from './styles/Sidebar.module.css'

function Sidebar() {

    const {userData, sidebar, setSidebar} = useContext(UserContext)

    useEffect(() => {
        sidebar && document.addEventListener('mousedown', outsideClick)
    }, [sidebar])

    const outsideClick = (e) => {
        if(sidebar && !(e.target.getAttribute('dropdownelement')==='true')){
            setTimeout(() => {
                setSidebar(false)
                document.removeEventListener('mousedown', outsideClick)
            }, 75)
           
        }
        
    }

  return (
    <div className={SidebarCSS.parent} style={{display: !sidebar && 'none'}}>
        <div className={SidebarCSS.sidebar} dropdownelement='true'>
            <div className={SidebarCSS.sidebarContainer}>
                <button className={SidebarCSS.xbutton}><FontAwesomeIcon icon={faXmark}/></button>

                <Link to='/' className={SidebarCSS.item}>
                    <div><FontAwesomeIcon icon={faEye} />Eye of Ophidia</div>
                </Link>
                <Link to='/events' className={SidebarCSS.item}>
                    <div>Events</div>
                </Link>
                {(userData.name) ? (
                    <>
                    <Link to='/postmatch' className={SidebarCSS.item}>
                        <div>Submit a new match!</div>
                    </Link>
                    <Link to='/postevent' className={SidebarCSS.item}>
                        <div>Submit a new event</div>
                    </Link>
                    <Link to='/issuepage' className={SidebarCSS.item}>
                        <div>Issues</div>
                    </Link>
                    <Link to='/me' className={SidebarCSS.item}>
                        <div>Me</div>
                    </Link>
                    </>
                ) : <>
                    <Link to='/login' className={SidebarCSS.item}>
                    <div>Login/Register</div>
                    </Link>
                </>}
            </div>
        </div>
    </div>
  )
}
export default Sidebar