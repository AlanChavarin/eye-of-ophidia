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

      <div className={FooterCSS.innerContainer}>
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
            <div data-cy="logoutButton">Logout</div>
          </Link>
        </> : <></>}
        {(!userData.name) && <>
          <Link to='/login' className={FooterCSS.item}>
            <div data-cy="loginButton" style={{fontWeight: '650'}}>Login/Register</div>
          </Link>
        </>}
      </div>

      
      <div className={FooterCSS.disclaimer}>
      Eyeofophidia.net is in no way affiliated with Legend Story Studios. Legend Story Studios®, Flesh and Blood™, and set names are trademarks of Legend Story Studios. Flesh and Blood characters, cards, logos, and art are property of Legend Story Studios.
      </div>
      
    </div>
  )
}
export default Footer