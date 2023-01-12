import MatchThumbnailCSS from './styles/MatchThumbnail.module.css'
import {Link} from 'react-router-dom'
import {useContext, useEffect} from 'react'
import UserContext from '../../context/UserContext'
import { heroImageUrls } from '../../helpers/HeroImageUrls'

function MatchResults({match}) {
  const {userData} = useContext(UserContext)
  return (
    <Link to={'/matches/' + match._id} className={MatchThumbnailCSS.match} >

      {match ? (
        <>
        <div className={MatchThumbnailCSS.info}>
          <div className={MatchThumbnailCSS.eventTitle}>
            {match.event.name} - Finals
          </div>
          <div className={MatchThumbnailCSS.date}>
            {match.event.startDate.substr(0, 10)}
          </div>
        </div>

        <div className={`${MatchThumbnailCSS.imageContainer} ${MatchThumbnailCSS.imageLeft}`} style={{
            backgroundImage: `url(${heroImageUrls[match.player1hero]})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '180%',
            backgroundPosition: '40% 10%',
          }}>

          <div className={MatchThumbnailCSS.playerName}>
            {match.player1name}
          </div>

        </div>

        <div className={`${MatchThumbnailCSS.imageContainer} ${MatchThumbnailCSS.imageRight}`} style={{
            backgroundImage: `url(${heroImageUrls[match.player2hero]})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '180%',
            backgroundPosition: '40% 10%',
          }}>
          

          <div className={MatchThumbnailCSS.playerName}>
            {match.player2name}
          </div>

        </div>
          
          {/* {(userData?.privilege === 'admin') ? <Link to={'/postmatch/' + match._id}>Edit this match</Link> : <></>} */}
        </>
      ): <></>}
      
    </Link>
  )
}
export default MatchResults