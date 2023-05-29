import EventThumbnailCSS from './styles/EventThumbnail.module.css'
import {Link} from 'react-router-dom'
import {getEventBackgroundImageURL} from '../pages/event/backgroundImageHelper'

function EventThumbnail({event, page, recyclebin, match, disableLink}) {

  return (
    <Link to={disableLink ? '' : `/events/${event._id}` + `${recyclebin ? '?recyclebin=true':''}`} className={`
    ${EventThumbnailCSS.container} 
    ${(page==='event') && EventThumbnailCSS.forEventsPage} 
    ${(page==='match') && EventThumbnailCSS.forMatchPage}
    ${(page==='issue') && EventThumbnailCSS.forIssuePage}
    `} 
    style={{
      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(${getEventBackgroundImageURL(event)})`,
      cursor: disableLink ? 'default' : 'pointer',
      }}>
        {event && (
        <>
          <div className={EventThumbnailCSS.name}>{event.name}</div>
          <div className={EventThumbnailCSS.details}>
            <div>{event.startDate.substr(0, 10)}
             {event.endDate && ` - ${event.endDate.substr(0, 10)}`} 
             
            </div>
            <div>{event.format}{event.format==='Mixed' && (<> Format</>)}</div>
            <div>{event.location}</div>
            {/* <hr /> */}
            {(page==='match' && match) && (<>
              <div style={{alignSelf: 'center', fontSize: '1.1em'}}>
                {match.top8 && <>{match.top8Round}</>}
                {!match.top8 && <>Swiss Round: {match.swissRound}</>}
              </div>
            </>)}
          </div>
        </>
        )}
    </Link>
  )
}

export default EventThumbnail