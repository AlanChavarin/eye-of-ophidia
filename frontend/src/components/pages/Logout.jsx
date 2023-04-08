import UserContext from "../../context/UserContext"
import {useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'

function Logout() {
    const {updateLoggedInUserData} = useContext(UserContext)


    useEffect(() => {
        localStorage.setItem('user', '')
        updateLoggedInUserData()
    }, [])

    return (
        <div style={{fontWeight: '500', fontSize: '1.2em', textAlign: 'center'}}> 
            You have been logged out! <br/>
            <Link to='/' style={{
                fontSize: '1.1em',
            }}>Return home</Link>
        </div>
    )
}
export default Logout