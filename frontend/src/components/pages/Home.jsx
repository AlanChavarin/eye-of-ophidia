import SearchForm from '../assets/SearchForm'
import HomeCSS from './styles/Home.module.css'
import LiveEvent from '../assets/LiveEvent'
import { Link } from 'react-router-dom'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSliders, faEye, faTrophy, faFlag} from '@fortawesome/free-solid-svg-icons'

function Home() {

  return (
    <div className={HomeCSS.parent}>
      <p style={{fontSize: '1em', padding: '8px'}}>Heads up! This tool is currently <span style={{fontWeight: 'bold'}}>BUGGED</span> due to a bug with youtube's video playback. Please either <span style={{fontWeight: 'bold'}}>sign out</span> of google/youtube or use a different browser to restore proper functionality.</p>
      <p className={HomeCSS.p}><FontAwesomeIcon icon={faEye} className={HomeCSS.icon}/>Eye of Ophidia</p>
      <SearchForm page='matches'/>
      {/* live event */}
      <LiveEvent/>
      {/* preview image */}
      {/* <img src="backgroundImages/preview.jpg" alt="" style={{
        width: '90%',
        marginTop: '64px',
        minWidth: '200px',
        borderRadius: '8px',
      }}/>
      <img src="backgroundImages/card.PNG" alt="" style={{
        width: '60%',
        minWidth: '200px',
        borderRadius: '16px',
      }}/> */}
      {/* info on site */}
      <div className={HomeCSS.infoContainer}>
        <div className={HomeCSS.infoItem}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={HomeCSS.itemIcon}/>
          <div>
            <p>Search for all recorded <b>Flesh and Blood feature matches </b>from across different official and community run events.</p>
          </div>
        </div>
        <div className={HomeCSS.infoItem}>
          <FontAwesomeIcon icon={faSliders} className={HomeCSS.itemIcon}/>
          <div>
            <p>Eye of Ophidia offers multiple <b>filters</b> to help you easily find matches</p>
            <p>Use the <b>Hero Matchup Filter</b> to find and study your weakest matchups! </p>
          </div>
        </div>

        <div className={HomeCSS.infoItem}>
          <FontAwesomeIcon icon={faTrophy} className={HomeCSS.itemIcon}/>
          <div>
            <p>Browse and search for <b>Events</b></p>
            <p>Event pages will show all recorded feature matches from that event. </p>
          </div>
        </div>

      </div>
      <div className={HomeCSS.infoItem}>
          <FontAwesomeIcon icon={faFlag} className={HomeCSS.itemIcon}/>
          <div>
            <p>Missing <b>Events</b>?</p>
            <p>Feel free to login and notify us of any missing events or issues with the site <Link to='/postissue' style={{fontWeight: 'bold'}}>here.</Link> </p>
          </div>
        </div>
    </div>
  )
}
export default Home