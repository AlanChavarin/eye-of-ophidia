//react
import {useState, useContext} from 'react'
import UserContext from '../../context/UserContext'
import { useNavigate, Link} from 'react-router-dom'

//service
import useLoginService from '../../service/useLoginService'

//css
import LoginCSS from './styles/Login.module.css'

//loader
import ClipLoader from 'react-spinners/ClipLoader'

function Login() {
  const navigate = useNavigate()
  const {loginLoading, postLogin, postRegistration, resendVerificationEmail} = useLoginService()
  const {updateLoggedInUserData} = useContext(UserContext)
  const [registrationMode, setRegistrationMode] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const [resendVerificationEmailData, setResendVerificationEmailData] = useState()

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
    if(registrationMode){
      postRegistration(formData)
      .then(data => {
        if(data){
          setResendVerificationEmailData(data)
        }
      })
    } else {
      postLogin(formData, updateLoggedInUserData)
      .then(data => {
        if(data){
          navigate('/')
        }
      })
    }
  }

  const onClick = () => {
    if(resendVerificationEmailData){
      resendVerificationEmail(resendVerificationEmailData)
    }
  }

  return (<div style={{display: 'flex', flexDirection: 'column'}}>
    {resendVerificationEmailData && <button onClick={onClick} className={LoginCSS.resendButton}>
      Resend verification email.  
    </button>}

    <div className={LoginCSS.parent}>
        
      <div className={LoginCSS.registrationModeSection}>
        <button onClick={() => setRegistrationMode(false)} className={`${LoginCSS.button} ${LoginCSS.buttonLogin} ${registrationMode ? LoginCSS.buttonUnselected : LoginCSS.buttonSelected}`}>Login</button>
        <button onClick={() => setRegistrationMode(true)} className={`${LoginCSS.button} ${LoginCSS.buttonRegister} ${registrationMode ? LoginCSS.buttonSelected : LoginCSS.buttonUnselected}`}>Register</button>
      </div>
      <form className={LoginCSS.form} onSubmit={onSubmit} id="form1">
          {(registrationMode) ? (
            <div className={LoginCSS.container}>
              <label>Name</label>
              <input type='text' value={name} name='name' minLength={5} onChange={onChange} className={LoginCSS.input}/>
            </div>
          ): <></>}
          <div className={LoginCSS.container}>
              <label>Email</label>
              <input type='email' value={email} name='email' onChange={onChange} className={LoginCSS.input}/>
          </div>
          <div className={LoginCSS.container}>
              <label>Password</label>
              <input type='password' value={password} name='password' minLength={8} onChange={onChange} className={LoginCSS.input}/>
          </div>
          {(registrationMode) ? (
            <div className={LoginCSS.container}>
              <label>Confirm Password</label>
              <input type='password' value={password2} name='password2' minLength={8} onChange={onChange} className={LoginCSS.input}/>
            </div>
          ): <></>}
          <div className={LoginCSS.container}>
          <button type="submit" form="form1" value="Submit" className={LoginCSS.submitButton}> 
            {loginLoading ? <ClipLoader color='white' size={20}/>
            : <>Submit</>}
          </button>
          </div>
      </form>
      {!registrationMode && 
        <div className={LoginCSS.forgotPasswordButtonParent}>
          <Link to='/requestpasswordreset' className={LoginCSS.forgotPasswordButton}>
            Forgot password?
          </Link>
        </div>}

    </div></div>
  )
}
export default Login