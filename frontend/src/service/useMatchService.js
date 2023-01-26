import {useContext} from 'react'
import AlertContext from '../context/AlertContext'

const useMatchService = () => {
    const API_URL = 'http://localhost:5000/api/matches/'
    const {addAlert} = useContext(AlertContext)

    const getMatch = async (matchid) => {
        return new Promise(resolve => {
            fetch(API_URL + matchid)
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
        })
    }

    const getMatches = async (text, hero1, hero2) => {
        return new Promise(resolve => (
            fetch(API_URL + '?text=' + text + '&hero1=' + hero1 + '&hero2=' + hero2)
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

    const getMatchesByEventName = async (eventName) => {
        return new Promise(resolve => (
            fetch(API_URL + 'byeventname/' + eventName)
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
                resolve(true)
            })
            .catch((error) => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        })
    }

    return {getMatch, getMatches, getMatchesByEventName, postMatch, deleteMatch}
}

export default useMatchService