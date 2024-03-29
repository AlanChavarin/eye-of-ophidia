import {useContext, useState} from 'react'
import AlertContext from '../context/AlertContext'

const MATCH_API_URL = `${process.env.REACT_APP_API && process.env.NODE_ENV==='development' ? process.env.REACT_APP_API : ''}` + '/api/matchedithistory/history/'
const EVENT_API_URL = `${process.env.REACT_APP_API && process.env.NODE_ENV==='development' ? process.env.REACT_APP_API : ''}` + '/api/eventedithistory/history/'

const useEditHistoryService = () => {
    
    const {addAlert} = useContext(AlertContext)
    const [editLoading, setLoading] = useState(false)

    const getMatchEditHistory = async (matchid, page, limit) => {
        setLoading(true)
        return new Promise(resolve => (
            fetch(MATCH_API_URL + matchid + '?page=' + page + '&limit=' + limit, {
                method: 'GET',
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
                setLoading(false)
                resolve(data)
            })
            .catch(error => err(error))
        ))
    }

    const getEventEditHistory = async (eventid, page, limit) => {
        console.log(EVENT_API_URL)
        setLoading(true)
        return new Promise(resolve => (
            fetch(EVENT_API_URL + eventid + '?page=' + page + '&limit=' + limit, {
                method: 'GET',
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

    return {editLoading, getMatchEditHistory, getEventEditHistory}
}

export default useEditHistoryService