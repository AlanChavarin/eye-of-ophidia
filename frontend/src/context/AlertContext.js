import {createContext, useState} from 'react'
const AlertContext = createContext()

export const AlertProvider = ({children}) => {
    const [message, setMessage] = useState('Default message')

    return <AlertContext.Provider value={{message, setMessage}}>
        {children}
    </AlertContext.Provider>
}

export default AlertContext