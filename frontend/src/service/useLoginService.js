import {useContext, useState} from 'react'
import AlertContext from '../context/AlertContext'

const useLoginService = () => {
    const API_URL =  `${process.env.REACT_APP_API && process.env.NODE_ENV==='development' ? process.env.REACT_APP_API : ''}` + '/api/users/'
    const {addAlert} = useContext(AlertContext)
    const [loginLoading, setLoading] = useState(false)

    const postLogin = async (formData, updateLoggedInUserData) => {
        setLoading(true)
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
                setLoading(false)
                resolve(true)
            })
            .catch(error => err(error))
        })
    }

    const postRegistration = async (formData) => {
        setLoading(true)
        return new Promise(resolve => {
            const {name, email, password, password2} = formData
            //check if passwords match
            if(password !== password2){
                addAlert('passwords do not match!', 'error')
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
                    setLoading(false)
                    resolve(data)
                })
                .catch(error => err(error))
            }
        })
            
    }

    const resendVerificationEmail = async (userData) => {
        setLoading(true)
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
                setLoading(false)
                resolve(data)
            })
            .catch(error => err(error))
            }
        )
    }

    const putVerify = async (token) => {
        setLoading(true)
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
                setLoading(false)
                resolve(true)
            })
            .catch(error => err(error))
        })
            
    }

    const getMe = async(token) => {
        setLoading(true)
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
            .catch(error => err(error))
        })
    }

    const changepfp = async(token, picture) => {
        setLoading(true)
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
                setLoading(false)
                resolve(true)
            })
            .catch(error => err(error))
        })
    }

    const changePrivileges = async(userid, privilege) => {
        setLoading(true)
        return new Promise(resolve => {
            fetch(API_URL + 'changeprivileges?userid=' + userid + '&privilege=' + privilege, {
                method: 'PUT',
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('user')
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                setLoading(false)
                resolve(data)
            })
            .catch(error => err(error))
        })
    }

    const getUsers = async(page, limit, privilege) => {
        !privilege && (privilege='')
        !page && (page='')
        !limit && (limit='')
        setLoading(true)
        return new Promise(resolve => {
            fetch(API_URL + '?page=' + page + '&limit=' + limit + '&privilege=' + privilege, {
                method: 'GET',
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('user')
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                setLoading(false)
                resolve(data)
            })
            .catch(error => err(error))
        })
    }

    const requestPasswordReset = async(email) => {
        setLoading(true)
        return new Promise(resolve => {
            fetch(API_URL + 'forgotuserpassword', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                setLoading(false)
                addAlert('Password reset email has been sent!', 'success')
                resolve(data)
            })
            .catch(error => err(error))
        })
    }

    const passwordReset = async(userid, token, formData) => {
        setLoading(true)
        const {password, password2} = formData
        if(password !== password2){
            addAlert('passwords do not match!', 'error')
            throw new Error('passwords do not match!')
        } else {
            return new Promise(resolve => {
                fetch(API_URL + 'resetuserpassword', {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        userid: userid,
                        token: token,
                        password: password
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if(data.errorMessage){
                        throw new Error(data.errorMessage)
                    }
                    setLoading(false)
                    addAlert('Password has been reset!', 'success')
                    resolve(data)
                })
                .catch(error => err(error))
            })
        }
        
    }

    const err = (error) => {
        console.error(error.message)
        addAlert(error.message, 'error')
        setLoading(false)
    }

    return {postLogin, postRegistration, resendVerificationEmail, putVerify, getMe, changepfp,
        loginLoading, getUsers, changePrivileges, requestPasswordReset, passwordReset}
}

export default useLoginService