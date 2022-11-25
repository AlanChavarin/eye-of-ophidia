const API_URL = 'http://localhost:5000/api/users/'

export const postLogin = async (formData, updateLoggedInUserData) => {
    const {email, password} = formData
    fetch(API_URL + 'login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        if(data.errorMessage){
            throw new Error(data.errorMessage)
        } else {
            localStorage.setItem('user', data.token)
            updateLoggedInUserData()
        }
    })
}

export const postRegistration = async (formData) => {
    const {name, email, password, password2} = formData
    //check if passwords match
    if(password !== password2){
        throw new Error('passwords do not match!')
    } else {
        fetch(API_URL + 'register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: password,
                email: email
            })
        })
        .then(res => res.json())
        .then((data) => {
            if(data.errorMessage){
                throw new Error(data.errorMessage)
            }
        })
    }
}

export const putVerify = async (token) => {
    fetch(API_URL + 'verify', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(res => res.json())
    .then((data) => {
        if(data.errorMessage){
            throw new Error(data.errorMessage)
        } else {
            console.log(data.message)
        }
    })
}