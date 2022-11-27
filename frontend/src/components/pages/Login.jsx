import LoginCSS from './styles/Login.module.css'
import {useState, useContext} from 'react'
import UserContext from '../../context/UserContext'
import { postLogin, postRegistration } from '../../service/LoginService'

function Login() {
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
    
  const onSubmit = (e) => {
    e.preventDefault()
    registrationMode ? 
    postRegistration(formData) : 
    postLogin(formData, updateLoggedInUserData)
  }

  return (
    <div>
        <div>
          <button onClick={() => setRegistrationMode(false)}>Login</button>
          <button onClick={() => setRegistrationMode(true)}>Registration</button>
        </div>
        <form className={LoginCSS.form} onSubmit={onSubmit}>
            {(registrationMode) ? (
              <div className={LoginCSS.container}>
                <label>Name</label>
                <input type='text' value={name} name='name' onChange={onChange}/>
              </div>
            ): <></>}
            <div className={LoginCSS.container}>
                <label>Email</label>
                <input type='email' value={email} name='email' onChange={onChange}/>
            </div>
            <div className={LoginCSS.container}>
                <label>Password</label>
                <input type='password' value={password} name='password' onChange={onChange}/>
            </div>
            {(registrationMode) ? (
              <div className={LoginCSS.container}>
                <label>Confirm Password</label>
                <input type='password' value={password2} name='password2' onChange={onChange}/>
              </div>
            ): <></>}
            <div className={LoginCSS.container}>
                <input type='submit'/>
            </div>
        </form>
    </div>
  )
}
export default Login