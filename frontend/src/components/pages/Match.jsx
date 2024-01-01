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

//loader
import MoonLoader from 'react-spinners/MoonLoader'
import ClipLoader from 'react-spinners/ClipLoader'

//helpers
import heroUrlHelper from '../assets/helpers/heroUrlHelper'

function Match() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const {matchLoading, getMatch, restoreMatch} = useMatchService()
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
      // return window.location.origin + `/images/${encodeURI(hero)}.jpg`
      return heroUrlHelper(hero)
    }

    const onClick = (e) => {
      setTab(e.target.value)
    }

    const restore = () => {
      if(recyclebin){
        restoreMatch(matchid)
        .then(data => data && navigate(`/matches/${matchid}`))     
      }
    }

  return (
      <div className={MatchCSS.container} >

        <MoonLoader size={100} loading={matchLoading} className={MatchCSS.loader}/> 

        <div className={MatchCSS.videoFeedbackContainer}>
          <div className={MatchCSS.videoContainer}>
            {(match && !match.twitch) && <iframe src={`https://www.youtube-nocookie.com/embed/${match.link}?start=${match.timeStamp===0 ? 1 : match.timeStamp}&rel=0`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowFullScreen data-cy="youtubeIFrame"></iframe>}

            {/* {(match && !match.twitch) && <iframe src={`https://www.youtube.com/embed/${match.link}?&rel=0`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" start="180" allowFullScreen data-cy="youtubeIFrame"></iframe>} */}

            {(match && match.twitch) && <iframe src={`https://player.twitch.tv/?video=${match.link}&time=${match.twitchTimeStamp ? match.twitchTimeStamp : '1s'}&parent=${process.env.NODE_ENV==='production' ? 'www.eyeofophidia.net' : 'localhost'}`} frameborder="0" allowfullscreen="true" scrolling="no" data-cy="twitchIframe"></iframe>
}
          </div>
        </div>

        <div className={MatchCSS.detailsContainer}>
          {(match) && <>

          {/* buttons */}
          <div className={MatchCSS.containerTab}> 
            {!recyclebin ? <>
              <button value='details' onClick={onClick} style={{backgroundColor: (tab==='details') && '#1446A0', color: (tab==='details') && 'white'}} data-cy="detailsButton">Details</button>
              <button value='comments' onClick={onClick} style={{backgroundColor: (tab==='comments') && '#1446A0', color: (tab==='comments') && 'white'}} data-cy="commentsButton">Comments</button>
              <button value='issues' onClick={onClick} style={{backgroundColor: (tab==='issues') && '#1446A0', color: (tab==='issues') && 'white'}} data-cy="issuesButtno">Issues</button>

              {(userData.privilege==='admin' || userData.privilege==='moderator') && <>
                <button value='history' onClick={onClick} style={{backgroundColor: (tab==='history') && '#1446A0', color: (tab==='history') && 'white'}} data-cy="editHistoryButton">Edit History</button>
                <Link to={`/postmatch/${matchid}`}><FontAwesomeIcon icon={faEdit} data-cy="editButton"/></Link>
              </>}</> 
              :

            <button onClick={restore} className={MatchCSS.restoreButton} data-cy="restoreButton">
              {matchLoading ? <ClipLoader size={15} color='white'/> : <>Restore Match</>}
            </button>
            }
          </div>

          {tab==='comments' && <Comments matchid={matchid}/>}
          {tab==='issues' && <Issues targetid={matchid} targetType='match'/>}
          {tab==='history' && <EditHistories id={matchid} forPage='match'/>}
          {tab==='details' && <>
            <EventThumbnail event={match.event} page='match' match={match}/>

            <div className={MatchCSS.playerContainer} style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${heroURL(match.player1hero)})`}} data-cy="player1Details">
              <div className={MatchCSS.playerName} data-cy="player1Name">{match.player1name}</div>
              {match.player1deck ? 
                <a href={`${match.player1deck}`} target="_blank" className={MatchCSS.link} data-cy="player1DeckLink">Deck List</a> :
                <div className={MatchCSS.unavailable}>Deck list N/A</div>
              }
            </div>

            <div className={MatchCSS.playerContainer} style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${heroURL(match.player2hero)})`}} data-cy="player2Details">
              <div className={MatchCSS.playerName} data-cy="player2Name">{match.player2name}</div>
              {match.player2deck ? 
                <a href={`${match.player2deck}`} target="_blank" className={MatchCSS.link} data-cy="player2DeckLink">Deck List</a> :
                <div className={MatchCSS.unavailable}>Deck list N/A</div>
              }
            </div> </>}
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