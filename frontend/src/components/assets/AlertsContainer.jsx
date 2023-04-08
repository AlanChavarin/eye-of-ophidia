//react
import {useContext} from 'react'

//context
import AlertContext from '../../context/AlertContext'
import Alert from './Alert'

//css
import AlertCSS from './styles/Alert.module.css'


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