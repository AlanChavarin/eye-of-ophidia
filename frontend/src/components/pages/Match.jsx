//react
import {useParams, Link, useSearchParams, useNavigate} from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'

//component imports
import Comments from '../assets/Comments'
import Issues from '../assets/Issues'
import EditHistories from '../assets/EditHistories'
import EventThumbnail from '../assets/EventThumbnail'

//context
import UserContext from '../../context/UserContext'

//service
import useMatchService from '../../service/useMatchService'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

//css
import MatchCSS from './styles/Match.module.css'

function Match() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const {getMatch, restoreMatch} = useMatchService()
    const {matchid} = useParams()
    const [match, setMatch] = useState()
    const [tab, setTab] = useState('details')
    const {userData} = useContext(UserContext)
    let recyclebin =  searchParams.get('recyclebin')
    !recyclebin && (recyclebin=false)

    useEffect(() => {
      getMatch(matchid, recyclebin)
      .then(data => setMatch(data))
    }, [])

    const heroURL = (hero) => {
      return window.location.origin + `/images/${encodeURI(hero)}.jpg`
    }

    const onClick = (e) => {
      setTab(e.target.value)
    }

    const restore = () => {
      if(recyclebin){
        restoreMatch(matchid)
        navigate(`/matches/${matchid}`)
      }
    }

  return (
      <div className={MatchCSS.container} >
        <div className={MatchCSS.videoFeedbackContainer}>
          <div className={MatchCSS.videoContainer}>
            {(match) && <iframe src={`https://www.youtube.com/embed/${match.link}?start=${match.timeStamp}&rel=0`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
          </div>
        </div>
        <div className={MatchCSS.detailsContainer}>
          {(match) && <>
          <div className={MatchCSS.feedbackContainer}>
            <div className={MatchCSS.containerTab}> 
              {!recyclebin ? <>
                <button value='details' onClick={onClick} style={{backgroundColor: (tab==='details') && '#1446A0', color: (tab==='details') && 'white'}}>Details</button>
                <button value='comments' onClick={onClick} style={{backgroundColor: (tab==='comments') && '#1446A0', color: (tab==='comments') && 'white'}}>Comments</button>
                <button value='issues' onClick={onClick} style={{backgroundColor: (tab==='issues') && '#1446A0', color: (tab==='issues') && 'white'}}>Issues</button>
                <button value='history' onClick={onClick} style={{backgroundColor: (tab==='history') && '#1446A0', color: (tab==='history') && 'white'}}>Edit History</button>
                {(userData.name) && <Link to={`/postmatch/${matchid}`}><FontAwesomeIcon icon={faEdit} /></Link>}
              </> : 
              <button onClick={restore} className={MatchCSS.restoreButton}>Restore Match</button>
              }
            </div>
            {tab==='comments' && <Comments matchid={matchid}/>}
            {tab==='issues' && <Issues targetid={matchid} targetType='match'/>}
            {tab==='history' && <EditHistories matchid={matchid}/>}
          </div>

          {tab==='details' && <>

          <EventThumbnail event={match.event} page='match' details={`${(match.top8) ? (`${match?.top8Round}`) : `Swiss Round ${match?.swissRound}`}`}/>

          <div className={MatchCSS.playerContainer} style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${heroURL(match.player1hero)})`}}>
            <div className={MatchCSS.playerName}>{match.player1name}</div>
            <a href={`${match.player1deck}`} target="_blank" className={MatchCSS.link}>Deck List</a>
          </div>

          <div className={MatchCSS.playerContainer} style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${heroURL(match.player2hero)})`}}>
            <div className={MatchCSS.playerName}>{match.player2name}</div>
            <a href={`${match.player1deck}`} target="_blank" className={MatchCSS.link}>Deck List</a> 
          </div> 

          </>}
            </>}
          </div>
          
      </div>
      
  )
}
export default Match

/* <div className={MatchCSS.eventContainer} style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(https://storage.googleapis.com/fabmaster/media/images/toa_art_01.width-10000.jpg)`}}>
  <div className={MatchCSS.eventName}>{match.event.name}</div>
  <div className={MatchCSS.eventDetailsContainer}>
    <div>Date: {match.event.startDate.substr(0, 10)} to {match.event.endDate.substr(0, 10)} </div>
    <div>Format: {match.event.format}</div>
    <div>Location: {match.event.location}</div>
    <div>Description: {match.event.description}</div>
  </div>
</div> */

/* <button value='theater' onClick={() => setTheater(!theater)} style={{backgroundColor: theater && '#e24840', color: theater && 'white'}}>
  <FontAwesomeIcon icon={faSquare} />
</button> */