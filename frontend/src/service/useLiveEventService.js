import AlertContext from '../context/AlertContext'
import {useContext, useState} from 'react'

const useLiveEventService = () => {
    const API_URL =  `${process.env.REACT_APP_API && process.env.NODE_ENV==='development' ? process.env.REACT_APP_API : ''}` + '/api/liveEvent/'
    const {addAlert} = useContext(AlertContext)
    const [liveEventLoading, setLoading] = useState(false)

    const getLiveEvent = async () => {
        setLoading(true)
        return new Promise(resolve => {
            fetch(API_URL)
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

    const postLiveEvent = async (link, site) => {
        setLoading(true)
        return new Promise(resolve => (
            fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
                },
                body: JSON.stringify({
                    link: link,
                    site: site,
                })
            })
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                setLoading(false)
                addAlert('Live Event Successfully updated!', 'success')
                resolve(true)
            })
            .catch((error) => err(error))
        ))
    }

    const err = (error) => {
        console.error(error.message)
        addAlert(error.message, 'error')
        setLoading(false)
    }

    return {getLiveEvent, postLiveEvent, liveEventLoading}
}

export default useLiveEventService

