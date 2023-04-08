//react
import {useContext} from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../../context/UserContext'

//css
import FooterCSS from './styles/Footer.module.css'


function Footer() {
  const {userData} = useContext(UserContext)

  return (
    <div className={`${FooterCSS.footer}`}>
      <div>
        Created by Alan Chavarin
      </div>
      {/* <div>
        {(userData?.name) ? 
        <>
          <div>
            Email: {userData.email}
          </div>
        </> : <></>}
      </div> */}
      {(userData?.name) ? <>
        <Link to='/logout' className={FooterCSS.logout}>
          <div>Logout</div>
        </Link>
      </> : <></>}
      {(!userData.name) && <>
        <Link to='/login' className={FooterCSS.item}>
          <div style={{fontWeight: '650'}}>Login/Register</div>
        </Link>
      </>}
      
    </div>
  )
}
export default Footer