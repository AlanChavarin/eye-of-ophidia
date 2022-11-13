const API_URL = 'http://localhost:5000/api/issues/'

export const getIssues = async (matchid) => {
    return new Promise(resolve => (
        fetch(API_URL + matchid)
        .then(res => res.json())
        .then((data) => {
            if(data.errorMessage){
                throw new Error(data.errorMessage)
            }
            resolve(data)
        })
        .catch((error) => {
            console.log(error)
        })
    ))
}

export const postIssue = async (matchid, formData) => {
    console.log(formData)
    const {title, body} = formData
    return new Promise(resolve => (
        fetch(API_URL + matchid, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('user')
            },
            body: JSON.stringify({
                title: title,
                body: body
            })
        })
        .then(res => res.json())
        .then((data) => {
            if(data.errorMessage){
                throw new Error(data.errorMessage)
            }
            resolve(true)
        })
        .catch((error) => {
            console.log(error)
        })
    ))
}

export const changeStatus = async (issueid, status) => {
    return new Promise(resolve => (
        fetch(API_URL + issueid, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('user')
            },
            body: JSON.stringify({
                status: status
            })
        })
        .then(res => res.json())
        .then((data) => {
            if(data.errorMessage){
                throw new Error(data.errorMessage)
            }
            resolve(true)
        })
        .catch((error) => {
            console.log(error)
        })
    ))
}