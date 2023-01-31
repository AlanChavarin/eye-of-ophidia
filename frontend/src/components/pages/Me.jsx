import UserContext from '../../context/UserContext'
import {useContext} from 'react'
import SearchableDropdown from '../assets/SearchableDropdown'

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
            <SearchableDropdown items={['Apples', 'Oranges', 'Fortnite', 'asedrfgjuhsdf']} height='20vh'/>
        </div>
    )
}
export default Me