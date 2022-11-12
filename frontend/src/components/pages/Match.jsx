import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import MatchResult from '../assets/MatchResult'
import Comments from '../assets/Comments'
import Issues from '../assets/Issues'
import {getMatch} from '../../service/MatchService'

function Match() {
    const {matchid} = useParams()
    const [match, setMatch] = useState()

    useEffect(() => {
      getMatch(matchid)
      .then(data => setMatch(data))
    }, [])

  return (
    <div className='matchresult-parent'>
        <MatchResult match={match} />
        <Comments matchid={matchid}/>
        <Issues matchid={matchid}/>
    </div>
  )
}
export default Match