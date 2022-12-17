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
            <iframe width="560" height="315" src="https://www.youtube.com/embed/JxS5E-kZc2s?start=20" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    )
}
export default Me