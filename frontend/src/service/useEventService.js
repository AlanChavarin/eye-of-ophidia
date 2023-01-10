import {useContext} from 'react'
import AlertContext from '../context/AlertContext'

const useEventService = () => {
    const API_URL = 'http://localhost:5000/api/events/'
    const {setMessage} = useContext(AlertContext)

    const getEvents = async () => {
        return new Promise(resolve => (
            fetch(API_URL)
            .then(res => res.json())
            .then((data) => {
                setMessage('events gotten')
                resolve(data)
            })
        ))
    }

    return {getEvents}
}

export default useEventService