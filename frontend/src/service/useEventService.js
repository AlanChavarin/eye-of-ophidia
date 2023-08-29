import {useContext, useState} from 'react'
import AlertContext from '../context/AlertContext'
const API_URL = `${process.env.REACT_APP_API && process.env.NODE_ENV==='development' ? process.env.REACT_APP_API : ''}` + '/api/events/'

const useEventService = () => {
    
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

    const getEvents = async (text, startDate, endDate, page, limit, order, recyclebin) => {
        setLoading(true)
        return new Promise(resolve => (
            fetch(API_URL + `${recyclebin ? '/recyclebin/':''}` + '?'
            + `${text ? '&text=' + text : ''}` 
            + `${startDate ? '&startDate=' + startDate : ''}`
            + `${endDate ? '&endDate=' + endDate : ''}`
            + `${page ? '&page=' + page : ''}`
            + `${limit ? '&limit=' + limit : ''}`
            + `${order ? '&order=' + order : ''}`, {
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

//this version uses a FormData object to send an image
    const postEvent = async (formData, eventid) => {
        setLoading(true)
        if(!eventid){
            eventid = ''
        } 
        if(!formData.endDate){
            formData.endDate = ''
        }
        if(formData.resetImage){
            formData.image = ''
            formData.bigImage = ''
        }

        const formDataObject = new FormData()
        Object.keys(formData).forEach((key, i) => {
            formDataObject.append(key, formData[key])
        })

        formDataObject.set('enctype', "multipart/form-data")

        return new Promise(resolve => (
            fetch(API_URL + eventid, {
                method: eventid ? 'PUT' : 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
                },
                body: formDataObject
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

    const editBackgroundPosition = async(backgroundPosition, eventid) => {
        setLoading(true)
        return new Promise(resolve => (
            fetch(API_URL + 'editbackgroundposition/' + eventid, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
                },
                body: JSON.stringify({
                    backgroundPosition: backgroundPosition
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                addAlert(`${data.name} BG position edited!`, 'success')
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

    const getAllBackgroundImageLinks = async () => {
        setLoading(true)
        return new Promise(resolve => {
            fetch(API_URL + 'getallbackgroundimagelinks')
            .then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                setLoading(false)
                resolve(data)
            })
            .catch((error) => err(error))
        })
    }

    const deleteBackgroundImage = async (imageLink, bigImageLink) => {
        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/
        if(!urlPattern.test(imageLink) || !urlPattern.test(bigImageLink)){
            throw new Error('did not pass a valid url')
        }

        setLoading(true)
        return new Promise(resolve => {
            fetch(API_URL + 'deletebackgroundimage', {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user')
                },
                body: JSON.stringify({
                    image: imageLink,
                    bigImage: bigImageLink
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                addAlert(data.message, 'success')
                setLoading(false)
                resolve(data)
            })
        })
    }

    const err = (error) => {
        console.error(error.message)
        addAlert(error.message, 'error')
        setLoading(false)
    }

    return {
        eventLoading, 
        getEvent, 
        getEvents, 
        postEvent, 
        deleteEvent, 
        restoreEvent, 
        editBackgroundPosition, 
        getAllBackgroundImageLinks, 
        deleteBackgroundImage
    }
}

export default useEventService


 // const postEvent = async (formData, eventid) => {
//     setLoading(true)
//     if(!eventid){
//         eventid = ''
//     } 
//     const {name, location, format, startDate, endDate, top8Day, dayRoundArr, notATypicalTournamentStructure, description} = formData
//     return new Promise(resolve => (
//         fetch(API_URL + eventid, {
//             method: eventid ? 'PUT' : 'POST',
//             headers: {
//                 'Content-type': 'application/json',
//                 'Authorization': 'Bearer ' + localStorage.getItem('user')
//             },
//             body: JSON.stringify({
//                 name: name,
//                 location: location,
//                 format: format, 
//                 startDate: startDate, 
//                 endDate: endDate,
//                 top8Day: top8Day,
//                 dayRoundArr: dayRoundArr,
//                 description: description,
//                 notATypicalTournamentStructure: notATypicalTournamentStructure,
//             })
//         })
//         .then(res => res.json())
//         .then((data) => {
//             if(data.errorMessage){
//                 throw new Error(data.errorMessage)
//             }
//             addAlert(`${data.name} event posted!`, 'success')
//             setLoading(false)
//             resolve(data)
//         })
//         .catch((error) => err(error))
//     ))
// }