import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Comments from '../assets/Comments'
import Issues from '../assets/Issues'
import EditHistories from '../assets/EditHistories'
import {getMatch} from '../../service/MatchService'
import MatchCSS from './styles/Match.module.css'

function Match() {
    const {matchid} = useParams()
    const [match, setMatch] = useState()
    const [tab, setTab] = useState('comments')

    useEffect(() => {
      getMatch(matchid)
      .then(data => {
        console.log(data)
        setMatch(data)
      })
    }, [])

    const onClick = (e) => {
      setTab(e.target.value)
    }

  return (
    <div className={MatchCSS.container}>
        <div className={MatchCSS.videoContainer}>
          {(match) && <iframe src={`https://www.youtube.com/embed/${match.link}?start=${match.timeStamp}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
        </div>

        <div className={MatchCSS.detailsContainer}>
          {(match) && <>
          <div>{match.player1name}</div>
          <div>{match.player1deck}</div>
          <div>{match.player1hero}</div>
          <div>{match.player2name}</div>
          <div>{match.player2deck}</div>
          <div>{match.player2hero}</div>
            

          </>}
        </div>
        

        {/* <div>
          <button value='comments' onClick={onClick}>Comments</button>
          <button value='issues' onClick={onClick}>Issues</button>
          <button value='history' onClick={onClick}>Edit History</button>
        </div>
        {tab==='comments' && <Comments matchid={matchid}/>}
        {tab==='issues' && <Issues matchid={matchid}/>}
        {tab==='history' && <EditHistories matchid={matchid}/>} */}
    </div>
  )
}
export default Match