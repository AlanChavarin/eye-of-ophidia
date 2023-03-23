import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import useLoginService from '../../service/useLoginService'

function Verify() {
  const {putVerify} = useLoginService()
  const {token} = useParams()
  const [finishedVerifying, setFinishedVerifying] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    putVerify(token)
    .then(() => setFinishedVerifying(true))
  }, [])

  useEffect(() => {
    if(finishedVerifying){
      setTimeout(() => {
        navigate('/login')
      }, 2000)
      
    }
  }, [finishedVerifying])

  return (
    <div style={{fontSize: "2em"}}>
      {finishedVerifying ? <>Your email has been verified! redirecting to the login page shortly</> : <>Attempting to verify your email.....</>}
    </div>
  )
}
export default Verify