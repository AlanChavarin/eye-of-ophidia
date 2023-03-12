import {useContext} from 'react'
import AlertContext from '../context/AlertContext'

const useEventService = () => {
    const API_URL = 'http://localhost:5000/api/events/'
    const {addAlert} = useContext(AlertContext)

    const getEvent = async (eventid) => {
        return new Promise(resolve => {
            fetch(API_URL + eventid)
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

    const getEvents = async (text, page, limit) => {
        !text && (text='')
        !page && (page=0)
        !limit && (limit=7)
        return new Promise(resolve => (
            fetch(API_URL + '?text=' + text + '&page=' + page + '&limit=' + limit)
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

    const postEvent = async (formData, eventid) => {
        if(!eventid){
            eventid = ''
        } 
        const {name, location, format, startDate, endDate, description} = formData
        return new Promise(resolve => (
            fetch(API_URL + eventid, {
                method: eventid ? 'PUT' : 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
                },
                body: JSON.stringify({
                    name: name,
                    location: location,
                    format: format, 
                    startDate: startDate, 
                    endDate: endDate,
                    description: description
                })
            })
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                addAlert(`${data.name} event posted!`, 'success')
                resolve(data)
            })
            .catch((error) => {
                console.error(error.message)
                addAlert(error.message, 'error')
            })
        ))
    }

    const deleteEvent = async (eventid) => {
        return new Promise(resolve => (
            fetch(API_URL + eventid, {
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
                addAlert(`${data.name} event deleted!`, 'success')
                resolve(data)
            })
            .catch((error) => {
                console.error(error.message)
                addAlert(error.message, 'error')
            })
        ))
    }

    return {getEvent, getEvents, postEvent, deleteEvent}
}

export default useEventService