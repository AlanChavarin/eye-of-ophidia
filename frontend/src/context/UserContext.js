import {createContext, useState} from 'react'

const UserContext = createContext()

export const UserProvider = ({children}) => {

    const [userData, setUserData] = useState({
        name:'',
        password: ''
    })

    







    return <UserContext.Provider value={{
        userData,
    }}>
        {children}
    </UserContext.Provider>
}

export default UserContext