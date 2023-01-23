import AlertCSS from './styles/Alert.module.css'
import {useContext} from 'react'
import AlertContext from '../../context/AlertContext'
import Alert from './Alert'

function AlertsContainer() {
  const {alerts} = useContext(AlertContext)
    
  return (
    <div className={AlertCSS.container}>
        {alerts.map(alert => {
            return <Alert alert={alert} key={alert.id}/>
        })}
    </div>
    
  )
}
export default AlertsContainer