//react
import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

//assets
import Popup from '../assets/Popup'
import SearchableDropdown from '../assets/SearchableDropdown'
import HeroSelect from '../assets/HeroSelect'

//service
import useEventService from '../../service/useEventService'
import useMatchService from '../../service/useMatchService'

//css
import PostMatchCSS from './styles/PostMatch.module.css'
import HeroSelectCSS from '../assets/styles/HeroSelect.module.css'
import PopupCSS from '../assets/styles/Popup.module.css'

//tools
import { getYoutubeParams } from '../../helpers/YoutubeParams'

function PostMatch() {
  const {postMatch, getMatch, deleteMatch} = useMatchService()
  const {getEvents} = useEventService()

  const navigate = useNavigate()
  const {matchid} = useParams()

  const [eventData, setEventData] = useState([])
  const [formData, setFormData] = useState({
    player1name: '',
    player1hero: '',
    player1deck: '',

    player2name: '',
    player2hero: '',
    player2deck: '',

    top8: '',
    swissRound: null,
    top8Round: 'None',

    event: '',
    format: '',
    link: '',
    timeStamp: '', 
    // description: '',
    fullLink: '',
  })
  const [deletePopup, setDeletePopup] = useState(false)
  const [heroType, setHeroType] = useState('')

  const {player1name, player1hero, player1deck, player2name, player2hero, player2deck, event, link, description, format, timeStamp, fullLink, top8, swissRound, top8Round} = formData

  useEffect(() => {
    if(matchid){
      getMatch(matchid)
      .then(data => setFormData({...data, event: data.event.name}))
    }
    getEvents()
    .then(data => {
      let eventNames = []
      data.map((event) => eventNames.push(event.name))
      setEventData(eventNames)
    })
  }, [])

  useEffect(() => {
    const params = getYoutubeParams(fullLink)
    if(params){
      setFormData((prevState) => ({
        ...prevState,
        link: params[0],
        timeStamp: params[1]
      }))
    }
  }, [fullLink])

  useEffect(() => {
    eventData.map((thisEvent) => {
      if(thisEvent.name === event && thisEvent.format !== 'Mixed'){
        setFormData((prevState) => ({
          ...prevState,
          format: thisEvent.format
        }))
      }
    })
  }, [event])

  useEffect(() => {
    if(format==='Classic Constructed'){
      setHeroType('adult')
    }
    if(format==='Blitz' || format==='Draft' || format==='Sealed'){
      setHeroType('young')
    }
    if(format===''){
      setHeroType('')
    }
  }, [format])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    postMatch(formData, matchid)
    .then(match => {
      navigate(`/matches/${match._id}`)
    })
  }

  const onDelete = (e) => {
    e.preventDefault()
    deleteMatch(matchid)
    navigate('/')
  }

  return (
    <div className={PostMatchCSS.parent}>
      <form onSubmit={onSubmit} className={PostMatchCSS.form}>
        <h3 style={{alignSelf: 'center'}}>{(matchid) ? (<>Edit Match</>):(<>Post New Match</>)}</h3>
        {matchid && <button className={PostMatchCSS.deleteButton} style={{position: 'absolute'}} onClick={(e) => {e.preventDefault(); setDeletePopup(true)}}><FontAwesomeIcon icon={faTrash} /></button>}
        
        <div className={PostMatchCSS.container}>
          <label>Event <span style={{color: 'red'}}>*</span></label>
          <SearchableDropdown items={eventData} onChange={onChange} value={event} name='event'/>
        </div>
        <div className={PostMatchCSS.container}>
          <label>Format <span style={{color: 'red'}}>*</span></label>
          <select name="format" className={HeroSelectCSS.select} onChange={onChange} value={format}>
            <option value=''>None</option>
            <option value="Classic Constructed">Classic Constructed</option>
            <option value="Blitz">Blitz</option>
            <option value="Draft">Draft</option>
            <option value="Sealed">Sealed</option>
          </select>
        </div>

        <div className={PostMatchCSS.top8OrSwissContainer}>
          <div className={PostMatchCSS.container}>
            <div onChange={onChange}>
              <label>Top 8</label>
              <input type="radio" name="top8" value={true} required/>
            </div>
            <div onChange={onChange}>
              <label>Swiss</label>
              <input type="radio" name="top8" value={false} required/>
            </div>
          </div>
          
          {top8==='true' && 
            <div className={PostMatchCSS.container}>
              <label>Top 8 Round <span style={{color: 'red'}}>*</span></label>
              <select name="top8Round" className={HeroSelectCSS.select} onChange={onChange} value={top8Round}>
                <option>None</option>
                <option value="Quarter Finals">Quarter Finals</option>
                <option value="Semi Finals">Semi Finals</option>
                <option value="Finals">Finals</option>
              </select>
            </div>
          }
          {top8==='false' &&
            <div className={PostMatchCSS.swissRoundContainer}>
              <label><span style={{color: 'red'}}>*</span>Swiss Round:</label>
              <input type="number" name='swissRound' value={swissRound} onChange={onChange} className={PostMatchCSS.input} style={{width: '30px'}}/>
            </div>
          }
        </div>

        <div className={PostMatchCSS.container}>
          <label>Youtube Video Link</label>
          <input type="url" name='fullLink' value={fullLink} onChange={onChange} className={PostMatchCSS.input}/>
        </div>
        <div className={PostMatchCSS.container}>
          <label>Match Timestamp (in total seconds) <span style={{color: 'red'}}>*</span></label>
          <input type="number" name='timeStamp' value={timeStamp} onChange={onChange} required className={PostMatchCSS.input} style={{width: '60px'}}/>
        </div>
        <div className={PostMatchCSS.container}>
          <label>Youtube Video id <span style={{color: 'red'}}>*</span></label>
          <input type="text" name='link' value={link} onChange={onChange} required className={PostMatchCSS.input}/>
        </div>
        
      

        <div className={PostMatchCSS.container}>
          <label>Player 1 Hero <span style={{color: 'red'}}>*</span></label>
          <HeroSelect name='player1hero' value={player1hero} onChange={onChange} required={true} type={heroType} className={PostMatchCSS.input}/>
        </div>
        <div className={PostMatchCSS.container}>
          <label>Player 1 Full Name <span style={{color: 'red'}}>*</span></label>
          <input type="text" name='player1name' value={player1name} onChange={onChange} required className={PostMatchCSS.input}/>
        </div>
        <div className={PostMatchCSS.container}>
          <label>Player 1 Deck Link <span style={{color: 'red'}}>*</span></label>
          <input type="url" name='player1deck' value={player1deck} onChange={onChange} required className={PostMatchCSS.input}/>
        </div>

        <div className={PostMatchCSS.container}>
          <label>Player 2 Hero <span style={{color: 'red'}}>*</span></label>
          <HeroSelect name='player2hero' value={player2hero} onChange={onChange} required={true} type={heroType} className={PostMatchCSS.input}/>
        </div>
        <div className={PostMatchCSS.container}>
          <label>Player 2 Full Name <span style={{color: 'red'}}>*</span></label>
          <input type="text" name='player2name' value={player2name} onChange={onChange} required className={PostMatchCSS.input}/>
        </div>
        <div className={PostMatchCSS.container}>
          <label>Player 2 Deck Link <span style={{color: 'red'}}>*</span></label>
          <input type="url" name='player2deck' value={player2deck} onChange={onChange} required className={PostMatchCSS.input}/>
        </div>
      
        {/* <div className={LoginCSS.container}>
          <label>Description</label>
          <textarea name="description" cols="30" rows="5" value={description} onChange={onChange}  className={LoginCSS.input}></textarea>
        </div> */}
        <input type="submit" className={PostMatchCSS.submitButton}/>
      </form>


      <Popup trigger={deletePopup}>
        <div>
          <h1>Are you sure you want to <b style={{color: 'red'}}>delete</b> this match? </h1>
        <div>It can be restored from the recycle bin at anytime if deleted.</div>
        </div>
        <div className={PostMatchCSS.popupButtons}>
          <button className={PopupCSS.deleteButton} onClick={onDelete}>Delete</button>
          <button className={PopupCSS.cancelButton} onClick={(e) => {e.preventDefault(); setDeletePopup(false)}}>Cancel</button>
        </div>
      </Popup>

    </div>
    
  )
}
export default PostMatch

/* <div className={LoginCSS.container}>
  <label>Date</label>
  <input type="date" name='date' value={date} onChange={onChange} required className={LoginCSS.input}/>
</div> */

/* <select required={true} name="event" className={HeroSelectCSS.select} onChange={onChange} value={event}>
  <option value=''>None</option>
  {eventData.map((event) => (<option value={event.name} value2={event.format} key={event._id}>{event.name}</option>))}
</select> */

{/* <input type="text" list='event' name='event' onChange={onChange} value={event}/>
<datalist id='event'>
  <option value=''>None</option>
  {eventData.map((event) => (<option value={event.name} value2={event.format} key={event._id}>{event.name}</option>))}
</datalist> */}