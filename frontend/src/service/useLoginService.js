import {useContext} from 'react'
import AlertContext from '../context/AlertContext'

const useLoginService = () => {
    const API_URL = 'http://localhost:5000/api/users/'
    const {addAlert} = useContext(AlertContext)

    const postLogin = async (formData, updateLoggedInUserData) => {
        return new Promise(resolve => {
            const {email, password} = formData
            fetch(API_URL + 'login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                localStorage.setItem('user', data.token)
                updateLoggedInUserData()
                addAlert(`Login Successful!`, 'success')
                resolve(true)
            })
            .catch(error => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        })
            
    }

    const postRegistration = async (formData) => {
        return new Promise(resolve => {
            const {name, email, password, password2} = formData
            //check if passwords match
            if(password !== password2){
                throw new Error('passwords do not match!')
            } else {
                fetch(API_URL + 'register', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        password: password,
                        email: email
                    })
                })
                .then(res => res.json())
                .then((data) => {
                    if(data.errorMessage){
                        throw new Error(data.errorMessage)
                    }
                    addAlert(`Verification email sent to ${data.email} Please verify your account!`, 'success')
                    resolve(data)
                })
                .catch(error => {
                    console.error(error.message)
                    addAlert(error.message, 'error')
                })
            }
        })
            
    }

    const resendVerificationEmail = async (userData) => {
        return new Promise(resolve => {
            fetch(API_URL + 'resendverification', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: userData.email,
                    id: userData.id
                })
            })
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                addAlert(`Verification email resent to ${userData.email} Please verify your account!`, 'success')
                resolve(data)
            })
            .catch(error => {
                console.error(error.message)
                addAlert(error.message, 'error')
            })
            }
        )
    }

    const putVerify = async (token) => {
        return new Promise(resolve => {
            fetch(API_URL + 'verify', {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                } 
                addAlert(`Verification Successful!`, 'success')
                resolve(true)
            })
            .catch(error => {
                console.error(error.message)
                addAlert(error.message, 'error')
            })
        })
            
    }

    const getMe = async(token) => {
        return new Promise(resolve => {
            fetch(API_URL + 'me', {
                method: 'GET',
                headers: {
                    'authorization': 'Bearer ' + token
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                resolve(data)
            })
            .catch(error => {
                console.error(error.message)
                addAlert(error.message, 'error')
            })
        })
    }

    const changepfp = async(token, picture) => {
        return new Promise(resolve => {
            fetch(API_URL + 'changepfp?picture=' + picture, {
                method: 'PUT',
                headers: {
                    'authorization': 'Bearer ' + token
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                resolve(true)
            })
            .catch(error => {
                console.error(error.message)
                addAlert(error.message, 'error')
            })
        })
    }
    

    return {postLogin, postRegistration, resendVerificationEmail, putVerify, getMe, changepfp}
}

export default useLoginService