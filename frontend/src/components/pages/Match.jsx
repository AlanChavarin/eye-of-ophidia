import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Comments from '../assets/Comments'
import Issues from '../assets/Issues'
import EditHistories from '../assets/EditHistories'
import {getMatch} from '../../service/MatchService'
import MatchCSS from './styles/Match.module.css'
import { heroImageUrls } from '../../service/ImageService'
import {Link} from 'react-router-dom'

function Match() {
    const {matchid} = useParams()
    const [match, setMatch] = useState()
    const [tab, setTab] = useState('details')

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

        <div className={MatchCSS.videoFeedbackContainer}>
          <div className={MatchCSS.videoContainer}>
            {(match) && <iframe src={`https://www.youtube.com/embed/${match.link}?start=${match.timeStamp}&rel=0`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
          </div>
        </div>
        <div className={MatchCSS.detailsContainer}>
          {(match) && <>

          <div className={MatchCSS.feedbackContainer}>
            <div className={MatchCSS.containerTab}> 
              <button value='details' onClick={onClick} style={{backgroundColor: (tab==='details') && '#1446A0', color: (tab==='details') && 'white'}}>Details</button>
              <button value='comments' onClick={onClick} style={{backgroundColor: (tab==='comments') && '#1446A0', color: (tab==='comments') && 'white'}}>Comments</button>
              <button value='issues' onClick={onClick} style={{backgroundColor: (tab==='issues') && '#1446A0', color: (tab==='issues') && 'white'}}>Issues</button>
              <button value='history' onClick={onClick} style={{backgroundColor: (tab==='history') && '#1446A0', color: (tab==='history') && 'white'}}>Edit History</button>
            </div>
            {tab==='comments' && <Comments matchid={matchid}/>}
            {tab==='issues' && <Issues matchid={matchid}/>}
            {tab==='history' && <EditHistories matchid={matchid}/>}
          </div>

          {tab==='details' && <>
          <div className={MatchCSS.eventContainer} style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(https://storage.googleapis.com/fabmaster/media/images/toa_art_01.width-10000.jpg)`}}>
            <div className={MatchCSS.eventName}>{match.event.name}</div>
            <div className={MatchCSS.eventDetailsContainer}>
              <div>Date: {match.event.startDate.substr(0, 10)} to {match.event.endDate.substr(0, 10)} </div>
              <div>Format: {match.event.format}</div>
              <div>Location: {match.event.location}</div>
              <div>Description: {match.event.description}</div>
            </div>
          </div>

          <div className={MatchCSS.playerContainer} style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${heroImageUrls[match.player1hero]})`}}>
            <div className={MatchCSS.playerName}>{match.player1name}</div>
            <a href={`http://${match.player1deck}`} target="_blank" className={MatchCSS.link}>Deck List</a>
          </div>
          <div className={MatchCSS.playerContainer} style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${heroImageUrls[match.player2hero]})`}}>
            <div className={MatchCSS.playerName}>{match.player2name}</div>
            <a href={`http://${match.player1deck}`} target="_blank" className={MatchCSS.link}>Deck List</a> 
          </div> </>}
            </>}
          </div>
          
      </div>
      
  )
}
export default Match