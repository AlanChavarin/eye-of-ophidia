import {createContext, useState, useEffect} from 'react'
import useLoginService from '../service/useLoginService'
const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [sidebar, setSidebar] = useState(false)
    const [userData, setUserData] = useState({
        name:'',
        email: '',
        karma: 0,
        privilege: ''
    })
    const {getMe} = useLoginService()

    useEffect(() => {
        updateLoggedInUserData()
    }, [])

    const updateLoggedInUserData = () => {
        const userToken = localStorage.getItem('user')
        if(userToken){
            getMe(userToken)
            .then(data => setUserData({
                name: data.name,
                email: data.email,
                karma: 0,
                privilege: data.privilege,
                picture: data.picture
            }))
        } else {
            setUserData({
                name:'',
                email: '',
                karma: 0,
                privilege: ''
            })
        }
    }

    return <UserContext.Provider value={{
        userData,
        updateLoggedInUserData,
        sidebar,
        setSidebar
    }}>
        {children}
    </UserContext.Provider>
}

export default UserContext