import EventThumbnailCSS from './styles/EventThumbnail.module.css'
import {Link} from 'react-router-dom'

function EventThumbnail({event}) {

    const num = event.startDate.substring(5, 7)
    const backgroundImage = window.location.origin + `/backgroundImages/${num}.jpg`

  return (
    <Link to={`/events/${event._id}`}>
        {event && (
        <div className={EventThumbnailCSS.container} style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${backgroundImage})`}}>
            <div className={EventThumbnailCSS.name}>{event.name}</div>
            <div className={EventThumbnailCSS.details}>
              <div>{event.startDate.substr(0, 10)} - {event.endDate.substr(0, 10)} </div>
              <div>{event.format}{event.format==='Mixed' && (<> Format</>)}</div>
              <div>{event.location}</div>
            </div>
        </div>
        )}
    </Link>
  )
}
export default EventThumbnail