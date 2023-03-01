//react
import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

//service
import useEventService from '../../service/useEventService'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

//assets
import Popup from '../assets/Popup'

//css
import PostMatchCSS from './styles/PostMatch.module.css'
import HeroSelectCSS from '../assets/styles/HeroSelect.module.css'
import PopupCSS from '../assets/styles/Popup.module.css'

function PostEvent() {
  const navigate = useNavigate()
  const {eventid} = useParams()
  const {getEvent, postEvent, deleteEvent} = useEventService()
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    format: 'Classic Constructed',
    startDate: '',
    endDate: '',
    description: ''
  })

  const [deletePopup, setDeletePopup] = useState(false)

  const {name, location, format, startDate, endDate, description} = formData

  useEffect(() => {
    if(eventid){
      getEvent(eventid)
      .then(data => {
        data.startDate = data.startDate.substring(0,10)
        data.endDate = data.endDate.substring(0,10)
        setFormData(data)
      })
    }
  }, [])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    postEvent(formData, eventid)
    .then(event => {
      console.log(event)
      navigate(`/events/${event._id}`)
    })
  }

  const onDelete = (e) => {
    e.preventDefault()
    deleteEvent(eventid)
    navigate('/')
  }

  return (
    <div className={PostMatchCSS.parent}>
      <form onSubmit={onSubmit} className={PostMatchCSS.form}>
        <h3 style={{alignSelf: 'center'}}>{(eventid) ? (<>Edit Event</>):(<>Post New Event</>)}</h3>
        {eventid && <button className={PostMatchCSS.deleteButton} style={{position: 'absolute'}} onClick={(e) => {e.preventDefault(); setDeletePopup(true)}}><FontAwesomeIcon icon={faTrash} /></button>}

        <div className={PostMatchCSS.container}>
          <label>Event Name</label>
          <input type="text" name='name' value={name} onChange={onChange} required className={PostMatchCSS.input}/>
        </div>
        <div className={PostMatchCSS.container}>
          <label>Location Name</label>
          <input type="text" name='location' value={location} onChange={onChange} required className={PostMatchCSS.input}/>
        </div>
        <div className={PostMatchCSS.container}>
          <label>Format</label>
          <select name="format" className={HeroSelectCSS.select} onChange={onChange} value={format}>
            <option value="Classic Constructed">Classic Constructed</option>
            <option value="Blitz">Blitz</option>
            <option value="Draft">Draft</option>
            <option value="Sealed">Sealed</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>
        <div className={PostMatchCSS.container}>
          <label>Start Date</label>
          <input type="date" name='startDate' value={startDate} onChange={onChange} required className={PostMatchCSS.input}/>
        </div>
        <div className={PostMatchCSS.container}>
          <label>End Date</label>
          <input type="date" name='endDate' value={endDate} onChange={onChange} required className={PostMatchCSS.input}/>
        </div>
        <div className={PostMatchCSS.container}>
          <label>Description</label>
          <textarea name="description" cols="30" rows="5" value={description} onChange={onChange}  className={PostMatchCSS.input}></textarea>
        </div>
        <input type="submit" className={PostMatchCSS.submitButton}/>
      </form>

      <Popup trigger={deletePopup}>
        <div>
          <h1>Are you sure you want to <b style={{color: 'red'}}>delete</b> this Event? </h1>
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
export default PostEvent