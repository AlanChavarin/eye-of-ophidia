import './styles/Login.css'
import {useState, useContext} from 'react'
import UserContext from '../../context/UserContext'

function Login() {
  const API_URL = 'http://localhost:5000/api/users/'
  const {updateLoggedInUserData} = useContext(UserContext)
  const [registrationMode, setRegistrationMode] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = formData

  const onChange = (e) => {
    e.preventDefault()
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmitForLogin = (e) => {
    e.preventDefault()
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

  const onSubmitForRegistration = (e) => {
    e.preventDefault()
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
        } else {
          console.log(data)
          localStorage.setItem('user', data.token)
          updateLoggedInUserData()
        }
      })
    }
  }

  return (
    <div className='login-parent'>
        <div>
          <button onClick={() => setRegistrationMode(false)}>Login</button>
          <button onClick={() => setRegistrationMode(true)}>Registration</button>
        </div>
        <form className='login-form' onSubmit={(registrationMode) ? onSubmitForRegistration : onSubmitForLogin}>
            {(registrationMode) ? (
              <div className='login-form-container'>
                <label>Name</label>
                <input type='text' value={name} name='name' onChange={onChange}/>
              </div>
            ): <></>}
            <div className='login-form-container'>
                <label>Email</label>
                <input type='email' value={email} name='email' onChange={onChange}/>
            </div>
            <div className='login-form-container'>
                <label>Password</label>
                <input type='password' value={password} name='password' onChange={onChange}/>
            </div>
            {(registrationMode) ? (
              <div className='login-form-container'>
                <label>Confirm Password</label>
                <input type='password' value={password2} name='password2' onChange={onChange}/>
              </div>
            ): <></>}
            <div className='login-form-container'>
                <input type='submit'/>
            </div>
        </form>
    </div>
  )
}
export default Login