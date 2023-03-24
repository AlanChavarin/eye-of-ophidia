import {useState, useEffect} from 'react'
import EditHistory from './EditHistory'
import EventEditHistory from './EventEditHistory'

//service
import useEditHistoryService from '../../service/useEditHistoryService'

//css
import CommentsCSS from './styles/Comments.module.css'
import EditHistoryCSS from './styles/EditHistory.module.css'

//loader
import MoonLoader from 'react-spinners/MoonLoader'

function EditHistories({id, forPage}) {
    const {editLoading, getMatchEditHistory, getEventEditHistory} = useEditHistoryService()
    const [history, setHistory] = useState()
    const [count, setCount] = useState()
    const [page, setPage] = useState(0)
    const limit = 10

    useEffect(() => {
        setHistory()
        if(forPage==='match'){
            getMatchEditHistory(id, page, limit)
            .then(data => {
                setHistory(data.matchEditHistories)
                setCount(data.count)
            })
        } else if(forPage==='event'){
            getEventEditHistory(id, page, limit)
            .then(data => {
                setHistory(data.eventEditHistories)
                setCount(data.count)
            })
        }
        
    }, [page])

  return (<div className={EditHistoryCSS.parent}>
        <div className={CommentsCSS.pageButtons}>
            {count && Array.from(Array(Math.floor(count/limit + 1)), (e, i) => <button className={i===page ? CommentsCSS.selectedButton : ''} onClick={() => {setPage(i)}}>{i+1}</button>)}
        </div>
        <div className={EditHistoryCSS.dropdownContainer}>
        <MoonLoader size={60} loading={editLoading} cssOverride={{alignSelf: 'center'}}/> 
            {(forPage==='match') && history?.map((editHistory, i, arr) => (
                <EditHistory editHistory={editHistory} key={i}
                previousHistory={(i!==arr.length-1) ? arr[i+1] : null}
                />
            ))}
            {(forPage==='event') && history?.map((editHistory, i, arr) => (
                <EventEditHistory editHistory={editHistory} key={i}
                previousHistory={(i!==arr.length-1) ? arr[i+1] : null}
                />
            ))}
        </div>
    </div>)
}
export default EditHistories