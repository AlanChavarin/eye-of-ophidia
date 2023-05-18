import {useContext, useState} from 'react'
import AlertContext from '../context/AlertContext'
const API_URL =  `${process.env.REACT_APP_API && process.env.NODE_ENV==='development' ? process.env.REACT_APP_API : ''}` + '/api/issues/'

const useIssueService = () => {
    
    const {addAlert} = useContext(AlertContext)
    const [issueLoading, setLoading] = useState(false)

    const getIssues = async (targetid, targetType, status, page, limit, order) => {
        setLoading(true)
        !targetid && (targetid='')
        !targetType && (targetType='')
        !status && (status='')
        !page && (page=0)
        !limit && (limit=10)
        return new Promise(resolve => (
            fetch(API_URL + '?targetid=' + targetid + '&status=' + status + '&targetType=' + targetType + '&page=' + page + '&limit=' + limit + '&order=' + order)
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                setLoading(false)
                resolve(data)
            })
            .catch((error) => err(error))
        ))
    }

    const getIssue = async (issueid) => {
        setLoading(true)
        return new Promise(resolve => {
            fetch(API_URL + issueid)
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

    const postIssue = async (targetid, formData, targetType) => {
        setLoading(true)
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
                setLoading(false)
                resolve(true)
            })
            .catch((error) => err(error))
        ))
    }

    const postGeneralIssue = async (formData) => {
        setLoading(true)
        const {title, body} = formData
        return new Promise(resolve => (
            fetch(API_URL + 'generalissue', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
                },
                body: JSON.stringify({
                    title: title,
                    body: body,
                    targetType: 'general'
                })
            })
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                addAlert('Issue successfully posted! We will be taking a look soon.', 'success')
                setLoading(false)
                resolve(true)
            })
            .catch((error) => err(error))
        ))
    }

    const changeStatus = async (issueid, status) => {
        setLoading(true)
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
                setLoading(false)
                resolve(true)
            })
            .catch((error) => err(error))
        ))
    }
    
    const err = (error) => {
        console.error(error.message)
        addAlert(error.message, 'error')
        setLoading(false)
    }

    return {issueLoading, getIssues, getIssue, postIssue, changeStatus, postGeneralIssue}
}

export default useIssueService