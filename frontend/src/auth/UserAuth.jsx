import {Outlet} from 'react-router-dom'
import {useContext} from 'react'
import UserContext from '../context/UserContext'

function UserAuth({privilege}) {
    const {userData} = useContext(UserContext)

    switch(privilege){
        case 'admin': {
            //console.log('admin')
            if(userData?.privilege === 'admin'){
                return <Outlet />
            } else {
                return (<div>You need admin privileges to access this page</div>)
            }
        }
        case 'user': {
            //console.log('user')
            if(userData?.privilege === 'admin' || userData?.privilege === 'user'){
                return <Outlet />
            } else {
                return (<div>You must be logged in to access this page</div>)
            }
        }
        default: {
            return (<div>prop error</div>)
        }
    }
    
}
export default UserAuth