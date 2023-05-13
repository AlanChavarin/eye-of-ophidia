import AlertContext from '../context/AlertContext'
import {useContext} from 'react'

const useLiveEventService = () => {
    const API_URL =  `${process.env.REACT_APP_API && process.env.NODE_ENV==='development' ? process.env.REACT_APP_API : ''}` + '/api/liveEvent/'
    const {addAlert} = useContext(AlertContext)

    const getLiveEvent = async () => {
        return new Promise(resolve => {
            fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                resolve(data)
            })
            .catch(error => err(error))
        })
    }

    const postLiveEvent = async (embed) => {
        return new Promise(resolve => (
            fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
                },
                body: JSON.stringify({
                    embed: embed,
                })
            })
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                addAlert('Live Event Successfully updated!', 'success')
                resolve(true)
            })
            .catch((error) => err(error))
        ))
    }

    const err = (error) => {
        console.error(error.message)
        addAlert(error.message, 'error')
    }

    return {getLiveEvent, postLiveEvent}
}

export default useLiveEventService

