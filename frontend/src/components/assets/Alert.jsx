import AlertCSS from './styles/Alert.module.css'
import { useEffect } from 'react'
import {useState} from 'react'

function Alerts({alert}) {
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    setTimeout(() => deleteAlert(alert.id), 7000)
  }, [])

  const deleteAlert = () => {
    setDeleted(true)
  }

  return (
    <div data-cy="alert" className={
      `${AlertCSS.alert} 
      ${alert.type === 'success' && AlertCSS.success}
      ${alert.type === 'error' && AlertCSS.error}
      ${deleted && AlertCSS.deleted}`
      } key={alert.id}>
      <button className={AlertCSS.closeButton} onClick={() => deleteAlert()}>X</button>
      <div data-cy="alertMessage" className={AlertCSS.message}>
        {alert.message}
      </div>
    </div>
  )
}
export default Alerts