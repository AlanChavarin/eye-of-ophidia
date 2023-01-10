import {createContext, useState, useEffect} from 'react'
const UserContext = createContext()

export const UserProvider = ({children}) => {
    const API_URL = 'http://localhost:5000/api/users/me'
    const [userData, setUserData] = useState({
        name:'',
        email: '',
        karma: 0,
        privilege: ''
    })

    useEffect(() => {
        updateLoggedInUserData()
    }, [])

    const updateLoggedInUserData = () => {
        const userToken = localStorage.getItem('user')
        if(userToken){
            fetch(API_URL, {
                method: 'GET',
                headers: {
                    'authorization': 'Bearer ' + userToken
                }
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                } else {
                    setUserData({
                        name: data.name,
                        email: data.email,
                        karma: data.karma,
                        privilege: data.privilege
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
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

    }}>
        {children}
    </UserContext.Provider>
}

export default UserContext