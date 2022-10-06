import './styles/Login.css'
import {useState, useContext} from 'react'
import UserContext from '../../context/UserContext'

function Login() {
  const API_URL = 'http://localhost:5000/api/users/login'
  const {updateLoggedInUserData} = useContext(UserContext)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = formData

  const onChange = (e) => {
    e.preventDefault()
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    fetch(API_URL, {
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
      if(data.errorMesssage){
        throw new Error(data.errorMessage)
      } else {
        localStorage.setItem('user', data.token)
        updateLoggedInUserData()
      }
    })
  }

  return (
    <div className='login-parent'>
        <form className='login-form' onSubmit={onSubmit}>
            <div className='login-form-container'>
                <label>Email</label>
                <input type='email' value={email} name='email' onChange={onChange}/>
            </div>
            <div className='login-form-container'>
                <label>Password</label>
                <input type='password' value={password} name='password' onChange={onChange}/>
            </div>
            <div className='login-form-container'>
                <input type='submit'/>
            </div>
        </form>
    </div>
  )
}
export default Login