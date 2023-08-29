//react
import {useReducer, useContext} from 'react'
import {useNavigate, Link} from 'react-router-dom'

//context
import UserContext from '../../../context/UserContext'

//service
import useLoginService from '../../../service/useLoginService'

//css
import LoginCSS from '../styles/Login.module.css'

//loader
import ClipLoader from 'react-spinners/ClipLoader'

//reducer
import { loginReducer, INITIAL_STATE } from './loginReducer'

function Login() {
  const {updateLoggedInUserData} = useContext(UserContext)
  const navigate = useNavigate()
  const {loginLoading, postLogin, postRegistration, resendVerificationEmail} = useLoginService()
  const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE)
  const {form, registrationMode, resendVerificationEmailData} = state
  const {name, email, password, password2} = form

  const onChange = (e) => {
    e.preventDefault()
    dispatch({type:'UPDATE_FORM', payload:e})
  }
    
  const onSubmit = async (e) => {
    e.preventDefault()
    if(registrationMode){
      postRegistration(form)
      .then(data => 
        data && dispatch({type: 'UPDATE_RESENDVERIFICATIONEMAILDATA', payload: data}))
    } else {
      postLogin(form, updateLoggedInUserData)
      .then(data => data && navigate('/'))
    }
  }

  const onClick = () => {
    if(resendVerificationEmailData){
      resendVerificationEmail(resendVerificationEmailData)
    }
  }

  const changeMode = (mode) => {
    dispatch({type: 'UPDATE_REGISTRATION_MODE', payload: mode})
  }

  return (<div style={{display: 'flex', flexDirection: 'column'}}>
    {resendVerificationEmailData && <button onClick={onClick} className={LoginCSS.resendButton}>
      Resend verification email.  
    </button>}

    <div className={LoginCSS.parent}>
        
      <div className={LoginCSS.registrationModeSection}>
        <button onClick={() => changeMode(false)} className={`${LoginCSS.button} ${LoginCSS.buttonLogin} ${registrationMode ? LoginCSS.buttonUnselected : LoginCSS.buttonSelected}`}>Login</button>
        <button onClick={() => changeMode(true)} className={`${LoginCSS.button} ${LoginCSS.buttonRegister} ${registrationMode ? LoginCSS.buttonSelected : LoginCSS.buttonUnselected}`}>Register</button>
      </div>
      <form className={LoginCSS.form} onSubmit={onSubmit} id="form1">
          {(registrationMode) ? (
            <div className={LoginCSS.container}>
              <label>Name</label>
              <input type='text' value={name} name='name' minLength={5} onChange={onChange} className={LoginCSS.input} />
            </div>
          ): <></>}
          <div className={LoginCSS.container}>
              <label>Email</label>
              <input type='email' value={email} name='email' onChange={onChange} className={LoginCSS.input} data-cy="inputEmail"/>
          </div>
          <div className={LoginCSS.container}>
              <label>Password</label>
              <input type='password' value={password} name='password' minLength={8} onChange={onChange} className={LoginCSS.input} data-cy="inputPassword"/>
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