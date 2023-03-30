import SearchForm from '../assets/SearchForm'
import HomeCSS from './styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

function Home() {
  return (
    <div className={HomeCSS.parent}>
        <p className={HomeCSS.p}><FontAwesomeIcon icon={faEye} className={HomeCSS.icon}/>Eye of Ophidia &</p>
        <SearchForm page='matches'/>
    </div>
  )
}
export default Home