import {useContext} from 'react'
import AlertContext from '../context/AlertContext'


const useEditHistoryService = () => {
    const API_URL = 'http://localhost:5000/api/matchedithistory/history/'
    const {addAlert} = useContext(AlertContext)

    const getMatchEditHistory = async (matchid, page, limit) => {
        return new Promise(resolve => (
            fetch(API_URL + matchid + '?page=' + page + '&limit=' + limit)
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

    return {getMatchEditHistory}
}

export default useEditHistoryService