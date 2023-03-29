import {useContext, useState} from 'react'
import AlertContext from '../context/AlertContext'

const useEventService = () => {
    const API_URL =  process.env.REACT_APP_API + 'events/'
    const {addAlert} = useContext(AlertContext)
    const [eventLoading, setLoading] = useState(false)

    const getEvent = async (eventid, recyclebin) => {
        setLoading(true)
        return new Promise(resolve => {
            fetch(API_URL + `${recyclebin ? 'recyclebin/':''}` + eventid, {
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
                setLoading(false)
                resolve(data)
            })
            .catch(error => err(error))
        })
    }

    const getEvents = async (text, page, limit, order, recyclebin) => {
        setLoading(true)
        !text && (text='')
        !page && (page=0)
        !limit && (limit=7)
        return new Promise(resolve => (
            fetch(API_URL + `${recyclebin ? 'recyclebin/':''}` + '?text=' + text + '&page=' + page + '&limit=' + limit + '&order=' + order, {
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

    const postEvent = async (formData, eventid) => {
        setLoading(true)
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
                setLoading(false)
                resolve(data)
            })
            .catch((error) => err(error))
        ))
    }

    const deleteEvent = async (eventid) => {
        setLoading(true)
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
                setLoading(false)
                resolve(data)
            })
            .catch((error) => err(error))
        ))
    }

    const restoreEvent = async (eventid) => {
        setLoading(true)
        return new Promise(resolve => (
            fetch(API_URL + 'recyclebin/' + eventid, {
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
                addAlert(`${data.name} event restored!`, 'success')
                setLoading(false)
                resolve(data)
            })
            .catch((error) => err(error))
        ))
    }

    const err = (error) => {
        console.error(error.message)
        addAlert(error.message, 'error')
        setLoading(false)
    }

    return {eventLoading, getEvent, getEvents, postEvent, deleteEvent, restoreEvent}
}

export default useEventService