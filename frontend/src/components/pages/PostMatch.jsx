import LoginCSS from './styles/Login.module.css'
import PostMatchCSS from './styles/PostMatch.module.css'
import HeroSelectCSS from '../assets/styles/HeroSelect.module.css'
import {useState, useEffect} from 'react'
import HeroSelect from '../assets/HeroSelect'
import {useParams, useNavigate} from 'react-router-dom'
import {postMatch, getMatch} from '../../service/MatchService'
import {getEvents} from '../../service/EventService'
import { getYoutubeParams } from '../../service/YoutubeParams'

function PostMatch() {
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

    event: '',
    format: '',
    link: '',
    timeStamp: '', 
    description: '',
    fullLink: '',
  })

  const {player1name, player1hero, player1deck, player2name, player2hero, player2deck, event, link, description, format, timeStamp, fullLink} = formData

  useEffect(() => {
    if(matchid){
      getMatch(matchid)
      .then(data => setFormData({...data, event: data.event.name}))
    }
    getEvents()
    .then(data => setEventData(data))
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
      console.log(match)
      navigate(`/matches/${match._id}`)
    })
  }


  return (
    <div className={LoginCSS.parent}>
      <form onSubmit={onSubmit} className={LoginCSS.form}>
        <h3 className={PostMatchCSS.h3}>{(matchid) ? (<>Edit Match</>):(<>Post New Match</>)}</h3>
        <div className={LoginCSS.container}>
          <label>Event</label>
          <select required={true} name="event" className={HeroSelectCSS.select} onChange={onChange} value={event}>
            <option value=''>None</option>
            {eventData.map((event) => (<option value={event.name} value2={event.format} key={event._id}>{event.name}</option>))}
          </select>
        </div>
        <div className={LoginCSS.container}>
          <label>Format</label>
          <select name="format" className={HeroSelectCSS.select} onChange={onChange} value={format}>
            <option value=''>None</option>
            <option value="Classic Constructed">Classic Constructed</option>
            <option value="Blitz">Blitz</option>
            <option value="Draft">Draft</option>
            <option value="Sealed">Sealed</option>
          </select>
        </div>
        <div className={LoginCSS.container}>
          <label>Youtube Video Link</label>
          <input type="url" name='fullLink' value={fullLink} onChange={onChange} className={LoginCSS.input}/>
        </div>
        <div className={LoginCSS.container}>
          <label>Match Timestamp (in total seconds)</label>
          <input type="number" name='timeStamp' value={timeStamp} onChange={onChange} required className={LoginCSS.input}/>
        </div>
        <div className={LoginCSS.container}>
          <label>Youtube Video id</label>
          <input type="text" name='link' value={link} onChange={onChange} required className={LoginCSS.input}/>
        </div>
        
      

        <div className={LoginCSS.container}>
          <label>Player 1 Hero</label>
          <HeroSelect name='player1hero' value={player1hero} onChange={onChange} required={true} className={LoginCSS.input}/>
        </div>
        <div className={LoginCSS.container}>
          <label>Player 1 Full Name</label>
          <input type="text" name='player1name' value={player1name} onChange={onChange} required className={LoginCSS.input}/>
        </div>
        <div className={LoginCSS.container}>
          <label>Player 1 Deck Link</label>
          <input type="url" name='player1deck' value={player1deck} onChange={onChange} required className={LoginCSS.input}/>
        </div>

        <div className={LoginCSS.container}>
          <label>Player 2 Hero</label>
          <HeroSelect name='player2hero' value={player2hero} onChange={onChange} required={true} className={LoginCSS.input}/>
        </div>
        <div className={LoginCSS.container}>
          <label>Player 2 Full Name</label>
          <input type="text" name='player2name' value={player2name} onChange={onChange} required className={LoginCSS.input}/>
        </div>
        <div className={LoginCSS.container}>
          <label>Player 2 Deck Link</label>
          <input type="url" name='player2deck' value={player2deck} onChange={onChange} required className={LoginCSS.input}/>
        </div>
      
        <div className={LoginCSS.container}>
          <label>Description</label>
          <textarea name="description" cols="30" rows="5" value={description} onChange={onChange}  className={LoginCSS.input}></textarea>
        </div>
        <input type="submit" className={LoginCSS.submitButton}/>
      </form>
    </div>
    
  )
}
export default PostMatch

{/* <div className={LoginCSS.container}>
  <label>Date</label>
  <input type="date" name='date' value={date} onChange={onChange} required className={LoginCSS.input}/>
</div> */}