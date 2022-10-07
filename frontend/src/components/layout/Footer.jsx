import {useContext} from 'react'
import UserContext from '../../context/UserContext'
import './styles/Footer.css'

function Footer() {
  const {userData} = useContext(UserContext)

  return (
    <div className='footer-parent'>
      <div className='footer-item footer-copyright'>
        Copyright Alan Chavarin
      </div>
      <div className='footer-item footer-userdata'>
        {(userData.name) ? 
        <>
          <div>
            Name: {userData.name}
          </div>
          <div>
            Email: {userData.email}
          </div>
        </> : <></>}
      </div>
      
    </div>
  )
}
export default Footer