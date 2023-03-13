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

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

//css
import EventCSS from './styles/Event.module.css'

function Event() {
    const navigate = useNavigate()
    const {userData} = useContext(UserContext)
    const {getEvent, restoreEvent} = useEventService()
    const {eventid} = useParams()
    const [event, setEvent] = useState()
    const {getMatchesByEvent} = useMatchService()
    const [matches, setMatches] = useState()
    const [backgroundImage, setBackgroundImage] = useState()
    const [issueTab, setIssueTab] = useState(false)
    const [searchParams] = useSearchParams()

    let recyclebin = searchParams.get('recyclebin')
    !recyclebin && (recyclebin=false)


    useEffect(() => {
        getEvent(eventid, recyclebin)
        .then(data => setEvent(data))
    }, [])

    useEffect(() => {
        event && getMatchesByEvent(event.name)
        .then(data => setMatches(data))
    }, [event])

    useEffect(() => {
        event && (setBackgroundImage(window.location.origin + `/backgroundImages/${event.startDate.substring(5, 7)}.jpg`))
    }, [event])

    const onClick = (e) => {
        (issueTab) ? setIssueTab(false) : setIssueTab(true)
    }

    const restore = () => {
        if(recyclebin){
            restoreEvent(eventid)
            .then(navigate(`/events/${eventid}`))
          }
    }

  return (
    <div className={EventCSS.parent}>
        {event && (<>
            <div className={EventCSS.eventContainer} style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${backgroundImage})`}}>
                {!recyclebin ? <>
                    {(userData.name) && <Link className={EventCSS.cornerItem} to={`/postevent/${eventid}`} style={{right: '70px', top: '2px'}}><FontAwesomeIcon icon={faEdit} /></Link>}

                    <button onClick={onClick} className={EventCSS.cornerItem} style={{right: '5px', top: '2px'}}>Issues</button></> : 
                    <button onClick={restore} className={`${EventCSS.restoreButton} ${EventCSS.cornerItem}`}>Restore Match</button>
                }
                
                <div className={EventCSS.eventName}>{event.name}</div>
                <div className={EventCSS.div1}>
                    <div className={EventCSS.eventDetails}>
                        <div>{event.startDate.substr(0, 10)} - {event.endDate.substr(0, 10)} </div>
                        <div>{event.format}{event.format==='Mixed' && (<> Format</>)}</div>
                        <div>{event.location}</div>
                    </div>
                    {event.description && <div className={EventCSS.verticalLine}></div>}
                    <div className={EventCSS.eventDetails}>
                        <div>{event.description}</div>
                    </div>
                </div>
            </div>
            {(issueTab) ? (<>
            <button onClick={onClick} className={EventCSS.cornerItem} style={{position: 'relative'}}>Back to event matches <FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
            <Issues targetid={event._id} targetType='event'/>
            </>
            ) : (<div className={EventCSS.matchThumbnailContainer}>
                {matches?.map((match) => (<MatchThumbnail key={match._id} match={match}/>))}  
            </div> )}

        </>)}
    </div>
  )
}
export default Event