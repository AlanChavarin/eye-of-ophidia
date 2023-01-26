import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import EventCSS from './styles/Event.module.css'
import useEventService from '../../service/useEventService'
import useMatchService from '../../service/useMatchService'
import MatchThumbnail from '../assets/MatchThumbnail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import UserContext from '../../context/UserContext'
import {useContext} from 'react'
import { Link } from 'react-router-dom'

function Event() {
    const {userData} = useContext(UserContext)

    const {getEvent} = useEventService()
    const {eventid} = useParams()
    const [event, setEvent] = useState()
    const {getMatchesByEventName} = useMatchService()
    const [matches, setMatches] = useState()

    const [backgroundImage, setBackgroundImage] = useState()


    useEffect(() => {
        getEvent(eventid)
        .then(data => setEvent(data))
    }, [])

    useEffect(() => {
        event && getMatchesByEventName(event.name)
        .then(data => setMatches(data))
    }, [event])

    useEffect(() => {
        event && (setBackgroundImage(window.location.origin + `/backgroundImages/${event.startDate.substring(5, 7)}.jpg`))
    }, [event]) 

  return (
    <div className={EventCSS.parent}>
        {event && ( <>
            <div className={EventCSS.eventContainer} style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${backgroundImage})`}}>
                {(userData.name) && <Link className={EventCSS.editLink} to={`/postevent/${eventid}`}><FontAwesomeIcon icon={faEdit} /></Link>}
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
            <div className={EventCSS.matchThumbnailContainer}>
                {matches?.map((match) => (<MatchThumbnail key={match._id} match={match}/>))}  
            </div> 
           
        </>)}
    </div>
  )
}
export default Event