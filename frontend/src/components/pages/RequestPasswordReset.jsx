//react
import { useState } from 'react'

//service
import useLoginService from '../../service/useLoginService'

//css
import LoginCSS from './styles/Login.module.css'

//cliploader
import ClipLoader from 'react-spinners/ClipLoader'

function RequestPasswordReset() {

    const [email, setEmail] = useState('')
    const {loginLoading, requestPasswordReset} = useLoginService()

    const [sent, setSent] = useState(false)

    const onChange = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        requestPasswordReset(email)
        .then(() => setSent(true))
    }

  return (
    <div className={LoginCSS.parent} style={{maxWidth: '400px'}}>
        <p style={{padding: '0px 30px 0px 30px'}}>
           Enter your account's email. A password reset link will be sent to your email. 
        </p>
        <form className={LoginCSS.form} onSubmit={(e) => onSubmit(e)} id='form1'>
            <div className={LoginCSS.container} style={{padding: '20px'}}>
                <label>Email: </label>
                <input type='email' value={email} name='email' onChange={onChange} className={LoginCSS.input}/>
            </div>

            <button type="submit" form="form1" value="Submit" className={LoginCSS.submitButton}> 
              {loginLoading ? <ClipLoader color='white' size={20}/>
              : <>{sent ? 'Resend email' : 'Submit'}</>}
            </button>
        </form>
    </div>
  )
}
export default RequestPasswordReset