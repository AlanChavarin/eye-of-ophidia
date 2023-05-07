//react
import {Link} from 'react-router-dom'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

//css
import MatchThumbnailCSS from './styles/MatchThumbnail.module.css'


function MatchThumbnail({match, page, recyclebin}) {
  const hero1url = window.location.origin + `/images/${encodeURI(match.player1hero)}.jpg`
  const hero2url = window.location.origin + `/images/${encodeURI(match.player2hero)}.jpg`

  const getMatchDate = () => {
    if(match.top8){
      if(match.event.endDate){
        return match.event.endDate.substr(0, 10)
      } else {
        return match.event.startDate.substr(0, 10)
      }
    }

    if(!match.event.dayRoundArr || (match.event?.dayRoundArr.length < 2)){
      return match.event.startDate.substr(0, 10)
    }

    const round = parseInt(match.swissRound)
    const arr = match.event.dayRoundArr
    let tempDate = new Date(match.event.startDate.substr(0, 10))
    for(let i = 0; i < arr.length; i++){
      if(round <= arr[i]){
        tempDate.setDate(tempDate.getDate() + i)
        return tempDate.toISOString().toString().substring(0, 10)
      }
    }

    return match.event.startDate.substr(0, 10)
  }

  return (
    <Link to={'/matches/' + match._id + `${recyclebin ? '?recyclebin=true':''}`} className={`
    ${MatchThumbnailCSS.match} 
    ${!page && MatchThumbnailCSS.default}
    ${page==='issue' && MatchThumbnailCSS.issuePage}
    `}>
      {match && (
        <>
        {page==='issue' && <Link to={`/postmatch/${match._id}`} className={MatchThumbnailCSS.editButton}><FontAwesomeIcon icon={faEdit} /></Link>}

        <div className={MatchThumbnailCSS.info}>
          <div className={MatchThumbnailCSS.eventTitle}>
            {match.event.name}
          </div>
          <div className={MatchThumbnailCSS.date}>
            {(match.top8) ? (`${match?.top8Round}`) : `Round ${match?.swissRound}`}
          </div>
          <div className={MatchThumbnailCSS.date}>
            {match.format !== 'Classic Constructed' && match.format}
          </div>
          <div className={MatchThumbnailCSS.date}>
            {getMatchDate()}
          </div>
        </div>

        <div className={`${MatchThumbnailCSS.imageContainer} ${MatchThumbnailCSS.imageLeft}`} style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)), url(${hero1url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '180%',
            backgroundPosition: '40% 10%',
          }}>

          <div className={MatchThumbnailCSS.playerName}>
            {match.player1name}
          </div>

        </div>

        <div className={`${MatchThumbnailCSS.imageContainer} ${MatchThumbnailCSS.imageRight}`} style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)), url(${hero2url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '180%',
            backgroundPosition: '40% 10%',
          }}>

          <div className={MatchThumbnailCSS.playerName}>
            {match.player2name}
          </div>

        </div>
        </>
      )}
      
    </Link>
  )
}
export default MatchThumbnail