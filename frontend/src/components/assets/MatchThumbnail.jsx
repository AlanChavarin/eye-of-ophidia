import MatchThumbnailCSS from './styles/MatchThumbnail.module.css'
import {Link} from 'react-router-dom'

function MatchResults({match}) {
  const hero1url = window.location.origin + `/images/${encodeURI(match.player1hero)}.jpg`
  const hero2url = window.location.origin + `/images/${encodeURI(match.player2hero)}.jpg`

  return (
    <Link to={'/matches/' + match._id} className={MatchThumbnailCSS.match} >

      {match && (
        <>
        <div className={MatchThumbnailCSS.info}>
          <div className={MatchThumbnailCSS.eventTitle}>
            {match.event.name}
          </div>
          <div className={MatchThumbnailCSS.date}>
            {match.event.startDate.substr(0, 10)}
          </div>
        </div>

        <div className={`${MatchThumbnailCSS.imageContainer} ${MatchThumbnailCSS.imageLeft}`} style={{
            backgroundImage: `url(${hero1url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '180%',
            backgroundPosition: '40% 10%',
          }}>

        <div className={MatchThumbnailCSS.playerName}>
          {match.player1name}
        </div>

        </div>

        <div className={`${MatchThumbnailCSS.imageContainer} ${MatchThumbnailCSS.imageRight}`} style={{
            backgroundImage: `url(${hero2url})`,
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
export default MatchResults