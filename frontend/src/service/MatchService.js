
const API_URL = 'http://localhost:5000/api/matches/'

export const getMatch = async (matchid) => {
    return new Promise(resolve => {
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
            //trigger alert
        })
    })
}

export const getMatches = async (text, hero1, hero2) => {
    return new Promise(resolve => (
        fetch(API_URL + '?text=' + text + '&hero1=' + hero1 + '&hero2=' + hero2)
        .then(res => res.json())
        .then((data) => {
            resolve(data)
        })
    ))
}

export const postMatch = async (formData, matchid) => {
    !matchid && (matchid='')
    return new Promise(resolve => (
        fetch(API_URL + matchid, {
            method: matchid ? 'PUT' : 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('user')
            },
            body: JSON.stringify(formData)
        })
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

export const deleteMatch = async (matchid) => {
    return new Promise(resolve => {
        fetch(API_URL + matchid, {
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
            resolve(true)
        })
        .catch((error) => {
            console.log(error)
        })
    })
}
