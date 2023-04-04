import EventThumbnailCSS from './styles/EventThumbnail.module.css'
import {Link} from 'react-router-dom'

function EventThumbnail({event, page, details, recyclebin}) {

  const num = event.startDate.substring(5, 7)
  const backgroundImage = window.location.origin + `/backgroundImages/${num}.jpg`

  return (
    <Link to={`/events/${event._id}` + `${recyclebin ? '?recyclebin=true':''}`} className={`
    ${EventThumbnailCSS.container} 
    ${(page==='event') && EventThumbnailCSS.forEventsPage} 
    ${(page==='match') && EventThumbnailCSS.forMatchPage}
    ${(page==='issue') && EventThumbnailCSS.forIssuePage}
    `} 
    style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(${backgroundImage})`}}>
        {event && (
        <>
          <div className={EventThumbnailCSS.name}>{event.name}</div>
          <div className={EventThumbnailCSS.details}>
            <div>{event.startDate.substr(0, 10)}
             {event.endDate && `- ${event.endDate.substr(0, 10)}`} 
             
            </div>
            <div>{event.format}{event.format==='Mixed' && (<> Format</>)}</div>
            <div>{event.location}</div>
            {(page==='matchPage') && (<div>{details}</div>)}
          </div>
        </>
        )}
    </Link>
  )
}
export default EventThumbnail