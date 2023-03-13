import {useContext} from 'react'
import AlertContext from '../context/AlertContext'

const useMatchService = () => {
    const API_URL = 'http://localhost:5000/api/matches/'
    const {addAlert} = useContext(AlertContext)

    const getMatch = async (matchid, recyclebin) => {
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
                resolve(data)
            })
            .catch(error => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        })
    }

    const getMatches = async (text, hero1, hero2, page, limit, recyclebin) => {
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
                resolve(data)
            })
            .catch(error => {
                console.error(error)
                addAlert(error.message, 'error')
            })

        ))
    }

    const getMatchesByEvent = async (event) => {
        return new Promise(resolve => (
            fetch(API_URL + 'byevent/' + event)
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                resolve(data)
            })
            .catch(error => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        ))
    }

    const postMatch = async (formData, matchid) => {
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
                resolve(data)
            })
            .catch((error) => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        ))
    }

    const deleteMatch = async (matchid) => {
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
                resolve(true)
            })
            .catch((error) => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        })
    }

    const restoreMatch = async (matchid) => {
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
                resolve(true)
            })
            .catch((error) => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        })
    }

    return {
        getMatch, 
        getMatches, 
        postMatch, 
        deleteMatch, 
        getMatchesByEvent,
        restoreMatch
    }
}

export default useMatchService