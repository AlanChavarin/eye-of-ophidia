import './styles/Login.css'
import {useState} from 'react'

function Login() {

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
    console.log(formData)
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