import {useContext} from 'react'
import AlertContext from '../context/AlertContext'

const useEditHistoryService = () => {
    const MATCH_API_URL = 'http://localhost:5000/api/matchedithistory/history/'
    const EVENT_API_URL = 'http://localhost:5000/api/eventedithistory/history/'
    const {addAlert} = useContext(AlertContext)

    const getMatchEditHistory = async (matchid, page, limit) => {
        return new Promise(resolve => (
            fetch(MATCH_API_URL + matchid + '?page=' + page + '&limit=' + limit)
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

    const getEventEditHistory = async (eventid, page, limit) => {
        return new Promise(resolve => (
            fetch(EVENT_API_URL + eventid + '?page=' + page + '&limit=' + limit)
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

    return {getMatchEditHistory, getEventEditHistory}
}

export default useEditHistoryService