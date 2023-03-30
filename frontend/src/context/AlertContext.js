import {createContext, useState} from 'react'
const AlertContext = createContext()

export const AlertProvider = ({children}) => {
    const [alerts, setAlerts] = useState([])

    const addAlert = async (message, type) => {
        console.log(message)
        const id = crypto.randomUUID()
        setAlerts([...alerts, {message: message, type: type, id: id}])
    }

    const deleteAlert = (id) => {
        setAlerts([...alerts.filter(alert => alert.id !== id)])
    }

    return <AlertContext.Provider value={{alerts, addAlert, deleteAlert}}>
        {children}
    </AlertContext.Provider>
}

export default AlertContext