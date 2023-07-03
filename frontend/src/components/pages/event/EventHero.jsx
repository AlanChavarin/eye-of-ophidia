//react
import {Link, useNavigate} from 'react-router-dom'

//context
import { useContext } from 'react'
import UserContext from '../../../context/UserContext'

//css
import EventCSS from '../styles/Event.module.css'

//helpers
import EventBackgroundAdjuster from './EventBackgroundAdjuster'
import { getEventBackgroundImageURL } from './backgroundImageHelper'

//cliploader
import ClipLoader from 'react-spinners/ClipLoader'

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

function EventHero({event, backgroundImage, recyclebin, eventid, page, setTab, lastRound, restore, eventLoading}) {

    const {userData} = useContext(UserContext)
    const navigate = useNavigate()

  return (
    <div className={EventCSS.eventContainer} 
        style={{
            backgroundPosition: `0px ${event?.backgroundPosition ? event?.backgroundPosition : '50%'}%`,
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), 
            url(${page==='eventPage' ? backgroundImage : getEventBackgroundImageURL(event)})`,
            alignSelf: 'center'
        }}>
        {/* corner container */}
        {page==='eventPage' && 
            <div className={EventCSS.cornerContainerParent}>
                <div className={EventCSS.cornerContainer}>
                    {(!recyclebin && (userData.privilege==='admin' || userData.privilege==='moderator')) && <>
                        <Link className={EventCSS.cornerItem} to={`/postevent/${eventid}`}>Edit <FontAwesomeIcon icon={faEdit} /></Link>
                        <button 
                            onClick={() => navigate(`/postmatch/?eventName=${event.name}&top8round=${lastRound?.top8}&round=${lastRound?.round}`)} 
                            className={EventCSS.cornerItem}> 
                                Post Match 
                        </button> 
                        {/* {eventid && <EventBackgroundAdjuster backgroundPosition={event?.backgroundPosition} setBackgroundPosition={setBackgroundPosition} eventid={eventid}/>} */}
                    </>}
                </div>
                <div className={EventCSS.cornerContainer}>
                    {!recyclebin ? <>
                        <button onClick={() => setTab('issues')} className={EventCSS.cornerItem}>Issues</button>

                        {(userData.privilege==='admin' || userData.privilege==='moderator') && <>
                            <button onClick={() => setTab('editHistory')} className={EventCSS.cornerItem}>Edit History</button>
                            
                        </>}
                        </> 
                        :
                        <button onClick={restore} className={`${EventCSS.restoreButton} ${EventCSS.cornerItem}`}>
                            {eventLoading ? <ClipLoader size={15} color='white'/> : <>Restore Event</>}
                        </button>
                    }
                </div>
            </div>
        }
        
        
        <div className={EventCSS.eventName}>{event.name}</div>
        <div className={EventCSS.div1}>
            <div className={EventCSS.eventDetails}>
                <div>{event?.startDate?.substr(0, 10)} {event.endDate && `- ${event.endDate.substr(0, 10)}`} </div>
                <div>{event?.format}{event.format==='Mixed' && (<> Format</>)}</div>
                <div>{event?.location}</div>
            </div>
            {event?.description && <div className={EventCSS.verticalLine}></div>}
            <div className={EventCSS.eventDetails}>
                <div>{event?.description}</div>
            </div>
        </div>
    </div>
  )
}
export default EventHero