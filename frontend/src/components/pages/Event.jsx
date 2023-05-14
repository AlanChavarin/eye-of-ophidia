//react
import {useParams, Link, useSearchParams, useNavigate} from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import UserContext from '../../context/UserContext'

//service
import useEventService from '../../service/useEventService'
import useMatchService from '../../service/useMatchService'

//assets
import Issues from '../assets/Issues'
import MatchThumbnail from '../assets/MatchThumbnail'
import EditHistories from '../assets/EditHistories'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

//css
import EventCSS from './styles/Event.module.css'

//loader
import MoonLoader from 'react-spinners/MoonLoader'
import ClipLoader from 'react-spinners/ClipLoader'

//helpers
import { getTimeDifference } from '../../helpers/timeDifference'

function Event() {
    const navigate = useNavigate()
    const {userData} = useContext(UserContext)
    const {eventLoading, getEvent, restoreEvent} = useEventService()
    const {matchLoading, getMatchesByEvent} = useMatchService()
    const {eventid} = useParams()
    const [event, setEvent] = useState()
    const [matches, setMatches] = useState()
    const [backgroundImage, setBackgroundImage] = useState()
    const [tab, setTab] = useState('matches')
    const [searchParams] = useSearchParams()
    const [lastRound, setLastRound] = useState()

    let recyclebin = searchParams.get('recyclebin')
    !recyclebin && (recyclebin=false)

    useEffect(() => {
        getEvent(eventid, recyclebin)
        .then(data => setEvent(data))
    }, [])

    useEffect(() => {
        event && getMatchesByEvent(eventid)
        .then(data => {
            setMatches(data)
            const round = data[data.length-1]
            if(!round?.top8){
                setLastRound({
                    top8: false,
                    round: round?.swissRound
                })
            } else {
                setLastRound({
                    top8: true,
                    round: round?.top8Round
                })
            }
        })
    }, [event])

    useEffect(() => {
        event && (setBackgroundImage(window.location.origin + `/backgroundImages/${event.startDate.substring(5, 7)}.jpg`))
    }, [event])

    const restore = () => {
        if(recyclebin){
            restoreEvent(eventid)
            .then(data => {
                data && navigate(`/events/${eventid}`)
            })
        }
    }

    const filter = (match, i) => {
        if(match.top8){
            return false
        }
        if(i < 1){
            if(match.swissRound <= event.dayRoundArr[i]){
                return true
            } else return false
        } else {
            if(match.swissRound > event.dayRoundArr[i-1] && match.swissRound <= event.dayRoundArr[i]){
                return true
            } else return false
        }
    }

  return (
    <div className={EventCSS.parent}>
        <MoonLoader size={100} loading={eventLoading}/> 
        {event && (<>
            {/* event container */}
            <div className={EventCSS.eventContainer} style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${backgroundImage})`}}>
                {/* corner container */}
                <div className={EventCSS.cornerContainer}>
                    {!recyclebin ? <>
                        <button onClick={() => setTab('issues')} className={EventCSS.cornerItem}>Issues</button>

                        {(userData.privilege==='admin') && <>
                            <button onClick={() => setTab('editHistory')} className={EventCSS.cornerItem}>Edit History</button>
                            <button 
                            onClick={() => navigate(`/postmatch/?eventName=${event.name}&top8round=${lastRound?.top8}&round=${lastRound?.round}`)} 
                            className={EventCSS.cornerItem}> 
                                Post Match 
                            </button>
                            <Link className={EventCSS.cornerItem} to={`/postevent/${eventid}`}><FontAwesomeIcon icon={faEdit} /></Link>
                        </>}
                        </> :
                        <button onClick={restore} className={`${EventCSS.restoreButton} ${EventCSS.cornerItem}`}>
                            {eventLoading ? <ClipLoader size={15} color='white'/> : <>Restore Event</>}
                        </button>
                    }
                </div>
                
                <div className={EventCSS.eventName}>{event.name}</div>
                <div className={EventCSS.div1}>
                    <div className={EventCSS.eventDetails}>
                        <div>{event.startDate.substr(0, 10)} {event.endDate && `- ${event.endDate.substr(0, 10)}`} </div>
                        <div>{event.format}{event.format==='Mixed' && (<> Format</>)}</div>
                        <div>{event.location}</div>
                    </div>
                    {event.description && <div className={EventCSS.verticalLine}></div>}
                    <div className={EventCSS.eventDetails}>
                        <div>{event.description}</div>
                    </div>
                </div>
            </div>

            {(tab==='issues') && (<>
            <button onClick={() => setTab('matches')} className={EventCSS.cornerItem} style={{position: 'relative'}}>Back to event matches <FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
            <Issues targetid={event._id} targetType='event'/>
            </>
            )}
            {(tab==='matches') && <div className={EventCSS.dayGroupings}>
                <MoonLoader size={70} loading={matchLoading || eventLoading}/> 
                {(matches && event.endDate && event.dayRoundArr) ? 
                    <>
                        {Array.from(Array(event.dayRoundArr.length), (e, i) => <div className={EventCSS.labelThumbnailContainer}>
                            <div className={EventCSS.dayLabel}>Day {i + 1}</div>
                            <div className={EventCSS.matchThumbnailContainer}>
                                {matches.filter(match => filter(match, i))
                                    .map((match) => (<MatchThumbnail key={match._id} match={match}/>))}
                                {(matches.filter(match => filter(match, i)).length < 1) && <>No Vods Available :{'('}</>}
                            </div>
                        </div>)}
                    <div className={EventCSS.labelThumbnailContainer}>
                        <div className={EventCSS.dayLabel}>Top8</div>
                        <div className={EventCSS.matchThumbnailContainer}>
                            {matches.filter(match => match.top8)
                                .map((match) => (<MatchThumbnail key={match._id} match={match}/>))}
                        </div>
                    </div>
                    
                    </> 
                    : 
                    <div className={EventCSS.matchThumbnailContainer}>
                        {matches?.map((match) => (<MatchThumbnail key={match._id} match={match}/>))}
                    </div>
                }
            </div>}
            {(tab==='editHistory') && <>
                <button onClick={() => setTab('matches')} className={EventCSS.cornerItem} style={{position: 'relative'}}>Back to event matches <FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
                <EditHistories id={eventid} forPage='event'/>
            </>}
            
            <br />
        </>)}
    </div>
  )
}
export default Event