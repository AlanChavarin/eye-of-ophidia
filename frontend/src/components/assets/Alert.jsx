import AlertCSS from './styles/Alert.module.css'
import { useEffect } from 'react'
import {useState} from 'react'

function Alerts({alert}) {
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    setTimeout(() => deleteAlert(alert.id), 100000)
  }, [])

  const deleteAlert = () => {
    setDeleted(true)
  }

  return (
    <div className={
        `${AlertCSS.alert} 
        ${alert.type === 'success' && AlertCSS.success}
        ${alert.type === 'error' && AlertCSS.error}
        ${deleted && AlertCSS.deleted}`
        } key={alert.id}>
        <button className={AlertCSS.closeButton} onClick={() => deleteAlert()}>X</button>
        <div>
            {alert.message}
        </div>
    </div>
  )
}
export default Alerts