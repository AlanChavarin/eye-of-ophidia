import {useState, useEffect} from 'react'
import { getMatchEditHistory } from '../../service/EditHistoryService'
import EditHistory from './EditHistory'

function EditHistories({matchid}) {
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