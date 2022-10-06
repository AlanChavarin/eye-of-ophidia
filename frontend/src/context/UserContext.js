import {createContext, useState, useEffect} from 'react'

const UserContext = createContext()

export const UserProvider = ({children}) => {
    const API_URL = 'http://localhost:5000/api/users/me'
    const [userData, setUserData] = useState({
        name:'',
        password: ''
    })

    useEffect(() => {
        updateLoggedInUserData()
    }, [])

    const updateLoggedInUserData = () => {
        console.log('updateLoggedInUserData')
        const userToken = localStorage.getItem('user')
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
                console.log(data.errorMessage)
            } else {
                setUserData({
                    name: data.name,
                    email: data.email,
                })
            }
        })
    }

    return <UserContext.Provider value={{
        userData,
        updateLoggedInUserData
    }}>
        {children}
    </UserContext.Provider>
}

export default UserContext