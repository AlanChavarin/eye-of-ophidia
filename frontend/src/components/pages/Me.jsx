import UserContext from '../../context/UserContext'
import {useContext} from 'react'

function Me() {
    const {userData} = useContext(UserContext)
    const {name, email, karma, privilege} = userData

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
        </div>
    )
}
export default Me