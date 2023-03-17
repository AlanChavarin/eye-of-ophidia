import {useState, useEffect} from 'react'
import EditHistory from './EditHistory'
import useEditHistoryService from '../../service/useEditHistoryService'

//css
import CommentsCSS from './styles/Comments.module.css'
import EditHistoryCSS from './styles/EditHistory.module.css'

function EditHistories({matchid}) {
    const {getMatchEditHistory} = useEditHistoryService()
    const [history, setHistory] = useState()
    const [count, setCount] = useState()
    const [page, setPage] = useState(0)
    const limit = 10

    useEffect(() => {
        getMatchEditHistory(matchid, page, limit)
        .then(data => {
            setHistory(data.matchEditHistories)
            setCount(data.count)
        })
    }, [page])

  return (
    <div>
        <div className={CommentsCSS.pageButtons}>
            {count && Array.from(Array(Math.floor(count/limit + 1)), (e, i) => <button className={i===page ? CommentsCSS.selectedButton : ''} onClick={() => {setPage(i)}}>{i+1}</button>)}
        </div>
        <div className={EditHistoryCSS.dropdownContainer}>
            {history?.map((editHistory, i, arr) => (
                <EditHistory editHistory={editHistory} key={i}
                previousHistory={(i!==arr.length-1) ? arr[i+1] : null}
                />
            ))}
        </div>
        
    </div>
  )
}
export default EditHistories