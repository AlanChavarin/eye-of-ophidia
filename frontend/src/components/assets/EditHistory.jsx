import {useState, useEffect} from 'react'
import { getMatchEditHistory } from '../../service/EditHistoryService'

function EditHistory({matchid}) {
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
        {history.map((history) => (
            <div>{history.editor}</div>
        ))}
    </div>
  )
}
export default EditHistory