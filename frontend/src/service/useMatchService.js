import {useContext, useState} from 'react'
import AlertContext from '../context/AlertContext'
const API_URL = `${process.env.REACT_APP_API && process.env.NODE_ENV==='development' ? process.env.REACT_APP_API : ''}` + '/api/matches/'

const useMatchService = () => {
    
    const {addAlert} = useContext(AlertContext)
    const [matchLoading, setLoading] = useState(false)

    const getMatch = async (matchid, recyclebin) => {
        setLoading(true)
        return new Promise(resolve => {
            fetch(API_URL + `${recyclebin ? 'recyclebin/':''}` + matchid, {
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

    const getMatches = async (text, hero1, hero2, startDate, endDate, format, page, limit, order, recyclebin) => {
        setLoading(true)
        return new Promise(resolve => (
            fetch(API_URL + `${recyclebin ? '/recyclebin/':''}` + '?' 
            + `${text ? '&text=' + text : ''}` 
            + `${hero1 ? '&hero1=' + hero1 : ''}`
            + `${hero2 ? '&hero2=' + hero2 : ''}`
            + `${startDate ? '&startDate=' + startDate : ''}`
            + `${endDate ? '&endDate=' + endDate : ''}`
            + `${format ? '&format=' + format : ''}`
            + `${page ? '&page=' + page : ''}`
            + `${limit ? '&limit=' + limit : ''}`
            + `${order ? '&order=' + order : ''}`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
                },
            })
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                setLoading(false)
                resolve(data)
            })
            .catch(error => err(error))
        ))
    }

    const getMatchesByEvent = async (event) => {
        setLoading(true)
        return new Promise(resolve => (
            fetch(API_URL + 'byevent/' + event)
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                setLoading(false)
                resolve(data)
            })
            .catch(error => err(error))
        ))
    }

    const postMatch = async (formData, dontUpdateLinks, matchid) => {
        setLoading(true)
        !matchid && (matchid='')
        return new Promise(resolve => (
            fetch(API_URL + matchid + `?&dontUpdateLinks=${dontUpdateLinks}`, {
                method: matchid ? 'PUT' : 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
                },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                addAlert(`${data.player1hero} vs ${data.player2hero} match successfully ${matchid ? 'edited!' : 'posted!'}`, 'success')
                setLoading(false)
                resolve(data)
            })
            .catch((error) => err(error))
        ))
    }

    const deleteMatch = async (matchid) => {
        setLoading(true)
        return new Promise(resolve => {
            fetch(API_URL + matchid, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
                }
            })
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                addAlert('Match deleted', 'success')
                setLoading(false)
                resolve(true)
            })
            .catch((error) => err(error))
        })
    }

    const restoreMatch = async (matchid) => {
        setLoading(true)
        return new Promise(resolve => {
            fetch(API_URL + 'recyclebin/' + matchid, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
                }
            })
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                addAlert('Match restored!', 'success')
                setLoading(false)
                resolve(true)
            })
            .catch((error) => err(error))
        })
    }

    const getNameLinkPairs = async (eventName, format) => {
        setLoading(true)
        return new Promise(resolve => (
            fetch(API_URL + `namelinkpairs/?event=${eventName}&format=${format}`)
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                setLoading(false)
                resolve(data)
            })
            .catch(error => err(error))
        ))
    }

    const err = (error) => {
        console.error(error.message)
        addAlert(error.message, 'error')
        setLoading(false)
    }

    return {
        matchLoading, 
        getMatch, 
        getMatches, 
        postMatch, 
        deleteMatch, 
        getMatchesByEvent,
        restoreMatch,
        getNameLinkPairs
    }
}

export default useMatchService