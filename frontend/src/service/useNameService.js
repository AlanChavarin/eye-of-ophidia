import {useContext, useState} from 'react'
import AlertContext from '../context/AlertContext'

const useNameService = () => {
    const API_URL = '/api/names/'
    const {addAlert} = useContext(AlertContext)
    const [nameLoading, setLoading] = useState(false)

    const getNames = async () => {
        setLoading(true)
        return new Promise(resolve => {
            fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
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

    const postName = async (name) => {
        setLoading(true)
        return new Promise(resolve => {
            fetch(API_URL + name, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
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

    const deleteName = async (name) => {
        setLoading(true)
        return new Promise(resolve => {
            fetch(API_URL + name, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
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

    const err = (error) => {
        console.error(error.message)
        addAlert(error.message, 'error')
        setLoading(false)
    }

    return {nameLoading, getNames, postName, deleteName}
}

export default useNameService