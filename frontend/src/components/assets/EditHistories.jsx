import {useState, useEffect} from 'react'
import EditHistory from './EditHistory'
import useEditHistoryService from '../../service/useEditHistoryService'

function EditHistories({matchid}) {
    const {getMatchEditHistory} = useEditHistoryService()
    const [history, setHistory] = useState()

    useEffect(() => {
        getMatchEditHistory(matchid)
        .then(data => setHistory(data))
    }, [])

    useEffect(() => {
        console.log(history)
    }, [history])

  return (
    <div>
        {history?.map((history) => (
            <EditHistory editHistory={history}/>
        ))}
    </div>
  )
}
export default EditHistories