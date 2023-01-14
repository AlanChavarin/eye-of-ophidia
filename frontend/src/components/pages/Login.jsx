import LoginCSS from './styles/Login.module.css'
import {useState, useContext} from 'react'
import UserContext from '../../context/UserContext'
import useLoginService from '../../service/useLoginService'
import { useNavigate } from 'react-router-dom'


function Login() {
  const navigate = useNavigate()
  const {postLogin, postRegistration} = useLoginService()
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
    
  const onSubmit = async (e) => {
    e.preventDefault()
    registrationMode ? 
    await postRegistration(formData) : 
    await postLogin(formData, updateLoggedInUserData)
    navigate('/')
  }

  return (
    <div className={LoginCSS.parent}>
        <div className={LoginCSS.registrationModeSection}>
          <button onClick={() => setRegistrationMode(false)} className={`${LoginCSS.button} ${LoginCSS.buttonLogin} ${registrationMode ? LoginCSS.buttonUnselected : LoginCSS.buttonSelected}`}>Login</button>
          <button onClick={() => setRegistrationMode(true)} className={`${LoginCSS.button} ${LoginCSS.buttonRegister} ${registrationMode ? LoginCSS.buttonSelected : LoginCSS.buttonUnselected}`}>Register</button>
        </div>
        <form className={LoginCSS.form} onSubmit={onSubmit}>
            {(registrationMode) ? (
              <div className={LoginCSS.container}>
                <label>Name</label>
                <input type='text' value={name} name='name' onChange={onChange} className={LoginCSS.input}/>
              </div>
            ): <></>}
            <div className={LoginCSS.container}>
                <label>Email</label>
                <input type='email' value={email} name='email' onChange={onChange} className={LoginCSS.input}/>
            </div>
            <div className={LoginCSS.container}>
                <label>Password</label>
                <input type='password' value={password} name='password' onChange={onChange} className={LoginCSS.input}/>
            </div>
            {(registrationMode) ? (
              <div className={LoginCSS.container}>
                <label>Confirm Password</label>
                <input type='password' value={password2} name='password2' onChange={onChange} className={LoginCSS.input}/>
              </div>
            ): <></>}
            <div className={LoginCSS.container}>
                <input type='submit' value={`${registrationMode ? 'Register' : 'Login'}`} className={LoginCSS.submitButton}/>
            </div>
        </form>
    </div>
  )
}
export default Login