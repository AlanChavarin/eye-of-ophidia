import UserContext from '../../context/UserContext'
import {useContext, useState} from 'react'
import MeCSS from './styles/Me.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import useLoginService from '../../service/useLoginService'

function Me() {
    const images = ['bauble', 'blood', 'eye', 'grand', 'heart', 'shard', 'tit']
    const {userData, updateLoggedInUserData} = useContext(UserContext)
    const {name, email, privilege, picture} = userData
    const img = window.location.origin + `/profilePics/${picture}.png`
    const [dropdown, setDropdown] = useState(false)
    const {changepfp} = useLoginService()

    const onClick = (e) => {
        const userToken = localStorage.getItem('user')
        changepfp(userToken, e.target.getAttribute('imgkey'))
        .then(data => updateLoggedInUserData())
    }


    return (
        <div className={MeCSS.parent}>
            <div className={MeCSS.subParent}>
                <div className={MeCSS.container1}>
                    <div className={MeCSS.img} style={{
                        backgroundImage: `url(${img})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100%',
                        }}>
                            <button className={MeCSS.editButton} onClick={() => setDropdown(!dropdown)}><FontAwesomeIcon icon={faEdit} /></button>
                    </div>
                    {dropdown && 
                        <div className={MeCSS.dropdown}>
                            {images.map(image => <img key={image} imgkey={image} src={window.location.origin + `/profilePics/${image}.png`} className={`${MeCSS.img} ${MeCSS.dropdownImg}`} onClick={onClick}/>)}
                        </div>}
                    <div style={{fontWeight: '500'}}>Avatar - {picture}</div>
                </div>
                <div className={MeCSS.entry}>{name}</div>
                <div className={MeCSS.entry}>{email}</div>
                <div className={MeCSS.entry}>Privileges: {privilege}</div>
            </div>
        </div>
    )
}
export default Me