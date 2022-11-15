import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import MatchResult from '../assets/MatchResult'
import Comments from '../assets/Comments'
import Issues from '../assets/Issues'
import EditHistory from '../assets/EditHistory'
import {getMatch} from '../../service/MatchService'

function Match() {
    const {matchid} = useParams()
    const [match, setMatch] = useState()
    const [tab, setTab] = useState('comments')

    useEffect(() => {
      getMatch(matchid)
      .then(data => setMatch(data))
    }, [])

    const onClick = (e) => {
      setTab(e.target.value)
    }

  return (
    <div className='matchresult-parent'>
        <MatchResult match={match} />
        <div>
          <button value='comments' onClick={onClick}>Comments</button>
          <button value='issues' onClick={onClick}>Issues</button>
          <button value='history' onClick={onClick}>Edit History</button>
        </div>
        {tab=='comments' && <Comments matchid={matchid}/>}
        {tab=='issues' && <Issues matchid={matchid}/>}
        {tab=='history' && <EditHistory matchid={matchid}/>}
    </div>
  )
}
export default Match