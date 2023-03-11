import {useContext} from 'react'
import AlertContext from '../context/AlertContext'

const useIssueService = () => {
    const API_URL = 'http://localhost:5000/api/issues/'
    const {addAlert} = useContext(AlertContext)

    const getIssues = async (targetid, status, page, limit) => {
        !page && (page=0)
        !limit && (limit=10)
        return new Promise(resolve => (
            fetch(API_URL + targetid + '?status=' + status + '&page=' + page + '&limit=' + limit)
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                resolve(data)
            })
            .catch((error) => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        ))
    }

    const getAllIssues = async (targetType, status, page, limit) => {
        !page && (page=0)
        !limit && (limit=10)
        if(!status)(status='')
        return new Promise(resolve => (
            fetch(API_URL + '?status=' + status + '&targetType=' + targetType + '&page=' + page + '&limit=' + limit)
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                resolve(data)
            })
            .catch((error) => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        ))
    }

    const getIssue = async (issueid) => {
        return new Promise(resolve => {
            fetch(API_URL + 'singleissue/' + issueid)
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

    

    const postIssue = async (targetid, formData, targetType) => {
        const {title, body} = formData
        return new Promise(resolve => (
            fetch(API_URL + targetid, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
                },
                body: JSON.stringify({
                    title: title,
                    body: body,
                    targetType: targetType,
                })
            })
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                addAlert('Issue successfully posted!', 'success')
                resolve(true)
            })
            .catch((error) => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        ))
    }

    const changeStatus = async (issueid, status) => {
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
                addAlert('Issue status successfully changed!', 'success')
                resolve(true)
            })
            .catch((error) => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        ))
    }

    return {getIssues, getIssue, getAllIssues, postIssue, changeStatus}
}

export default useIssueService