import {Outlet} from 'react-router-dom'
import {useContext} from 'react'
import UserContext from '../context/UserContext'

function UserAuth() {
    const {userData} = useContext(UserContext)

    if(userData?.name){
        return (<Outlet />)
    } else {
        return (
            <div>
                You are not authorized to access this page. 
            </div>
        )
    }
    
}
export default UserAuth