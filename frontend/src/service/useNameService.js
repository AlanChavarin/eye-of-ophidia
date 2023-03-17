import {useContext} from 'react'
import AlertContext from '../context/AlertContext'

const useNameService = () => {
    const API_URL = 'http://localhost:5000/api/names/'
    const {addAlert} = useContext(AlertContext)

    const getNames = async () => {
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
                resolve(data)
            })
            .catch(error => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        })
    }

    const postName = async (name) => {
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
                resolve(data)
            })
            .catch(error => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        })
    }

    const deleteName = async (name) => {
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
                resolve(data)
            })
            .catch(error => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        })
    }

    return {getNames, postName, deleteName}
}

export default useNameService