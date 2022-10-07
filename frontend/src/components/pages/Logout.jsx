import UserContext from "../../context/UserContext"
import {useContext, useEffect} from 'react'

function Logout() {
    const {updateLoggedInUserData} = useContext(UserContext)

    useEffect(() => {
        localStorage.setItem('user', '')
        updateLoggedInUserData()
    }, [])

    return (
        <div>
            You have been logged out!
        </div>
    )
}
export default Logout