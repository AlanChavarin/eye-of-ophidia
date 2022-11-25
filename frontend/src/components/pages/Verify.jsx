import {useEffect} from 'react'
import {putVerify} from '../../service/LoginService'
import {useParams} from 'react-router-dom'

function Verify() {
  const {token} = useParams()
  useEffect(() => {
    putVerify(token)
  }, [])

  return (
    <div>
        Verify 
    </div>
  )
}
export default Verify