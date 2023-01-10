import AlertCSS from './styles/Alert.module.css'
import {useContext, useEffect} from 'react'
import AlertContext from '../../context/AlertContext'

function Alert() {
    const {message} = useContext(AlertContext)

  return (
    <div className={AlertCSS.alert}>
        {message}
    </div>
  )
}
export default Alert