//react
import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

//service
import useLoginService from '../../service/useLoginService'

//css
import LoginCSS from './styles/Login.module.css'

//cliploader
import ClipLoader from 'react-spinners/ClipLoader'



function PasswordReset() {
    const {loginLoading, passwordReset} = useLoginService()
    const [searchParams] = useSearchParams()
    const userid = searchParams.get('userid')
    const token = searchParams.get('token')
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        password:'',
        password2:''
    })

    const {password, password2} = formData

    const onChange = (e) => {
        e.preventDefault()
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        passwordReset(userid, token, formData)
        .then(data => {
            if(data.message){
                navigate('/login')
            }
        })
    }

  return (
    <div className={LoginCSS.parent} style={{maxWidth: '400px'}}>
        <p style={{padding: '0px 30px 0px 30px'}}>
            Reset your password
        </p>
        <form className={LoginCSS.form} onSubmit={(e) => onSubmit(e)} id='form1'>
            <div className={LoginCSS.container}>
                <label>Password</label>
                <input type='password' value={password} name='password' minLength={8} onChange={onChange} className={LoginCSS.input}/>
            </div>

            <div className={LoginCSS.container}>
                <label>Confirm Password</label>
                <input type='password' value={password2} name='password2' minLength={8} onChange={onChange} className={LoginCSS.input}/>
            </div>

            <button type="submit" form="form1" value="Submit" className={LoginCSS.submitButton}> 
              {loginLoading ? <ClipLoader color='white' size={20}/>
              : <>Submit</>}
            </button>
        </form>
    </div>
  )
}
export default PasswordReset