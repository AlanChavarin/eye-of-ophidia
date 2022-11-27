import {useContext} from 'react'
import UserContext from '../../context/UserContext'
import FooterCSS from './styles/Footer.module.css'
import {Link} from 'react-router-dom'

function Footer() {
  const {userData} = useContext(UserContext)

  return (
    <div className={`${FooterCSS.footer}`}>
      <div>
        Copyright Alan Chavarin
      </div>
      <div>
        {(userData?.name) ? 
        <>
          <div>
            Email: {userData.email}
          </div>
        </> : <></>}
      </div>
      {(userData?.name) ? <>
        <Link to='/logout' className={FooterCSS.logout}>
          <div>Logout</div>
        </Link>
      </> : <></>}
      
    </div>
  )
}
export default Footer