import {useContext, useState} from 'react'
import AlertContext from '../context/AlertContext'

const useMatchService = () => {
    const API_URL = '/api/matches/'
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

    const getMatches = async (text, hero1, hero2, page, limit, recyclebin) => {
        console.log(API_URL + 'test')
        setLoading(true)
        !page && (page=0)
        !limit && (limit=10)
        return new Promise(resolve => (
            fetch(API_URL + `${recyclebin ? 'recyclebin':''}` + '?text=' + text + '&hero1=' + hero1 + '&hero2=' + hero2 + '&page=' + page + '&limit=' + limit, {
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

    const postMatch = async (formData, matchid) => {
        setLoading(true)
        !matchid && (matchid='')
        return new Promise(resolve => (
            fetch(API_URL + matchid, {
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
        restoreMatch
    }
}

export default useMatchService