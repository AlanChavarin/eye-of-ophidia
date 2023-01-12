import AlertCSS from './styles/Alert.module.css'
import {useContext} from 'react'
import AlertContext from '../../context/AlertContext'

function Alert() {
    const {alerts, deleteAlert, alertTimeout} = useContext(AlertContext)
    
  return (
    <div className={AlertCSS.container}>
        {alerts.map(alert => {
            return <div className={
              `${AlertCSS.alert} 
              ${alert.type === 'success' && AlertCSS.success}
              ${alert.type === 'error' && AlertCSS.error}`
              } key={alert.id}>
                <button className={AlertCSS.closeButton} onClick={() => deleteAlert(alert.id)}>X</button>
                <div>
                  {alert.message}
                </div>
            </div>
        })}
    </div>
    
  )
}
export default Alert