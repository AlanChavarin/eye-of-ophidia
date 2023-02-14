import UserContext from '../../context/UserContext'
import {useContext} from 'react'

function Me() {
    const {userData} = useContext(UserContext)
    const {name, email, karma, privilege, picture} = userData
    const img = window.location.origin + `/profilePics/${picture}.png`

    return (
        <div>
            <div>
                Name: {name}
            </div>
            <div>
                Email: {email}
            </div>
            <div>
                karma: {karma}
            </div>
            <div>
                privilege: {privilege}
            </div>
            <div style={{backgroundImage: `url(${img})`, height: '200px'}}>
                picture: {picture}
            </div>
        </div>
    )
}
export default Me