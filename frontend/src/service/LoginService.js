const API_URL = 'http://localhost:5000/api/users/'


export const loginCall = async (formData) => {
    const {email, password} = formData
    return new Promise(resolve => {
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
                resolve(true)
            }
        })
    })
    
}

export const registrationCall = async (formData) => {
    const {name, email, password, password2} = formData
    //check if passwords match
    if(password !== password2){
      throw new Error('passwords do not match!')
    } else {
      return new Promise(resolve => {
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
            } else {
            localStorage.setItem('user', data.token)
            resolve(true)
            }
        })
      })
    }
}