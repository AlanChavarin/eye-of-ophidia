import {useContext} from 'react'
import AlertContext from '../context/AlertContext'


const useEditHistoryService = () => {
    const API_URL = 'http://localhost:5000/api/matchedithistory/history/'
    const {addAlert} = useContext(AlertContext)

    const getMatchEditHistory = async (matchid) => {
        return new Promise(resolve => (
            fetch(API_URL + matchid)
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                resolve(data)
            })
            .catch((error) => console.log(error))
        ))
    }

    return {getMatchEditHistory}
}

export default useEditHistoryService