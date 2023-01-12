import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import useLoginService from '../../service/useLoginService'

function Verify() {
  const {putVerify} = useLoginService()
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