import SearchForm from '../assets/SearchForm'
import HomeCSS from './styles/Home.module.css'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSliders, faEye, faTrophy} from '@fortawesome/free-solid-svg-icons'

function Home() {

  return (
    <div className={HomeCSS.parent}>
      <p className={HomeCSS.p}><FontAwesomeIcon icon={faEye} className={HomeCSS.icon}/>Eye of Ophidia</p>
      <SearchForm page='matches'/>
      {/* live event */}
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
    </div>
  )
}
export default Home