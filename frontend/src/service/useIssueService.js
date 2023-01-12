import {useContext} from 'react'
import AlertContext from '../context/AlertContext'



const useIssueService = () => {

    const API_URL = 'http://localhost:5000/api/issues/'
    const {addAlert} = useContext(AlertContext)

    const getIssues = async (matchid) => {
        return new Promise(resolve => (
            fetch(API_URL + matchid)
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                resolve(data)
            })
            .catch((error) => {
                console.log(error)
            })
        ))
    }

    const postIssue = async (matchid, formData) => {
        const {title, body} = formData
        return new Promise(resolve => (
            fetch(API_URL + matchid, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
                },
                body: JSON.stringify({
                    title: title,
                    body: body
                })
            })
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                resolve(true)
            })
            .catch((error) => {
                console.log(error)
            })
        ))
    }

    const changeStatus = async (issueid, status) => {
        console.log(issueid, status)
        return new Promise(resolve => (
            fetch(API_URL + issueid, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
                },
                body: JSON.stringify({
                    status: status
                })
            })
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                resolve(true)
            })
            .catch((error) => {
                console.log(error)
            })
        ))
    }

    return {getIssues, postIssue, changeStatus}
}

export default useIssueService