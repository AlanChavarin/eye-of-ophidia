//react
import { useState, useEffect, useContext } from "react"
import UserContext from '../../context/UserContext'

//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faCaretDown } from '@fortawesome/free-solid-svg-icons'

//css
import UsersCSS from '../pages/styles/Users.module.css'

//service
import useLoginService from "../../service/useLoginService"

//loader
import ClipLoader from "react-spinners/ClipLoader"

function User({user}) {
  const [dropdown, setDropdown] = useState(false)
  const {loginLoading, changePrivileges} = useLoginService()
  const [data, setData] = useState(user)
  const {userData} = useContext(UserContext)
  const [warning, setWarning] = useState(false)
  const [tempPrivilege, setTempPrivilege] = useState(false)

  const onClick = () => {
    setDropdown(!dropdown)
  }

  useEffect(() => {
    document.addEventListener('mousedown', outsideClick)
  }, [dropdown])

  const fireWarning = (privilege) => {
    setWarning(true)
    setTempPrivilege(privilege)
  }

  const cancelWarning = () => {
    setTempPrivilege()
    setWarning(false)
  }

  const onClickChangePrivileges = (privilege) => {
    changePrivileges(data._id, privilege)
    .then(data => {
      setData(data)
      setDropdown(false)
      setWarning(false)
    })
    
  } 

  const outsideClick = (e) => {
    if(!(e.target.getAttribute('id')===data._id)){
      setDropdown(false)
      cancelWarning()
      document.removeEventListener('mousedown', outsideClick)
    }
  }

  return (<div className={UsersCSS.user}>
    <img className={UsersCSS.img} src={`/profilepics/${data.picture}.png`} width="25" height="25"/>

    <p style={{
      fontSize: (data.name.length > 19) && '.6em'
    }}>{data.name}: {loginLoading ? <ClipLoader size={14}/> : data.privilege}</p>

    <button className={UsersCSS.button} onClick={onClick}>
      <FontAwesomeIcon icon={dropdown ? faCaretDown : faGear}/>
    </button>

    <div style={{position: 'relative'}}>
      {(dropdown && !warning) && 
        <div className={UsersCSS.dropdown} id={data._id}>
          Change user privileges:
          {(userData==='admin') && <button id={data._id} onClick={() => fireWarning('moderator')}>Moderator</button>}
          <button id={data._id} onClick={() => fireWarning('user')}>User</button>
          <button id={data._id} onClick={() => fireWarning('banned')}>Banned</button>
        </div>
      }

      {(dropdown && warning) && <div className={UsersCSS.dropdown} id={data._id}>
          <p>Are you sure you want to change this user's privileges to <span style={{color: 'red'}}>{tempPrivilege}</span></p>
          <button id={data._id} onClick={() => onClickChangePrivileges(tempPrivilege)}>Proceed</button>
          <button id={data._id} onClick={() => cancelWarning()}>Cancel</button>
        </div>
      }
    </div>

  </div>)
}
export default User