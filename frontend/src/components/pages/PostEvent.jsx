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

//loader
import MoonLoader from 'react-spinners/MoonLoader'
import ClipLoader from 'react-spinners/ClipLoader'

//helpers
import { getTimeDifference } from '../../helpers/timeDifference'

function PostEvent() {
  const navigate = useNavigate()
  const {eventid} = useParams()
  const {eventLoading, getEvent, postEvent, deleteEvent} = useEventService()
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    format: 'Classic Constructed',
    startDate: '',
    endDate: '',
    top8Day: false,
    dayRoundArr: [],
    description: ''
  })
  const [isMultiDay, setIsMultiDay] = useState(false)

  const [deletePopup, setDeletePopup] = useState(false)

  const {name, location, format, startDate, endDate, top8Day, description, dayRoundArr} = formData

  useEffect(() => {
    if(eventid){
      getEvent(eventid)
      .then(data => {
        data.startDate = data.startDate?.substring(0,10)
        data.endDate = data.endDate?.substring(0,10)
        setFormData(data)
        if(data.endDate){
          setIsMultiDay(true)
        }
      })
    }
  }, [])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onChangeCheckedMultiDay = (e) => {
    setIsMultiDay(e.target.checked)
  }

  const onChangeCheckedTop8Day = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.checked
    }))
    if(!e.target.checked){
      setDayRoundArr(dayRoundArr.slice(0, dayRoundArr.length-1))
    }
  } 

  const onChangeDayRoundArray = (e) => {
    let tempArr = [...dayRoundArr]
    tempArr[e.target.getAttribute('index')] = parseInt(e.target.value)
    for(let i = 0; i < tempArr.length;i++){
      if(tempArr[i] >= tempArr[i+1]){
        tempArr[i+1] = parseInt(tempArr[i]) + 1
      }
    }
    setDayRoundArr(tempArr)

  }

  const setDayRoundArr = (newArray) => {
    setFormData(prev => ({
      ...prev,
      dayRoundArr: newArray
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    postEvent(formData, eventid)
    .then(event => navigate(`/events/${event._id}`))
  }

  const onDelete = (e) => {
    e.preventDefault()
    deleteEvent(eventid)
    .then(data => {
      if(data){
        navigate('/events')
      }
    })
  }

  return (
    <div className={PostMatchCSS.parent}>
      <form onSubmit={onSubmit} className={PostMatchCSS.form} id="form1">
      {(eventid && !formData?.location) && <div><MoonLoader size={20} />Fetching event data...</div>}
        <h3 style={{alignSelf: 'center'}}>{(eventid) ? (<>Edit Event</>):(<>Post New Event</>)}</h3>
        {eventid && <button className={PostMatchCSS.deleteButton} style={{position: 'absolute'}} onClick={(e) => {e.preventDefault(); setDeletePopup(true)}}><FontAwesomeIcon icon={faTrash} /></button>}

        <div className={PostMatchCSS.container}>
          <label>Event Name <span style={{color: 'red'}}>*</span></label>
          <input type="text" name='name' value={name} onChange={onChange} required className={PostMatchCSS.input}/>
        </div>
        
        <div className={PostMatchCSS.container}>
          <label>Location Name <span style={{color: 'red'}}>*</span></label>
          <input type="text" name='location' value={location} onChange={onChange} required className={PostMatchCSS.input}/>
        </div>

        <div className={PostMatchCSS.container}>
          <label>Format <span style={{color: 'red'}}>*</span></label>
          <select name="format" className={HeroSelectCSS.select} onChange={onChange} value={format}>
            <option value="Classic Constructed">Classic Constructed</option>
            <option value="Blitz">Blitz</option>
            <option value="Draft">Draft</option>
            <option value="Sealed">Sealed</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>

        <div>
          <label>Multiday Event</label>
          <input type="checkbox" value={isMultiDay} onChange={onChangeCheckedMultiDay}/>
        </div>

        <div className={PostMatchCSS.container}>
          <label>{isMultiDay ? <>Start Date</> : <>Date</>}</label>
          <input type="date" name='startDate' value={startDate} onChange={onChange} required className={PostMatchCSS.input}/>
        </div>

        {isMultiDay && <>
          <div className={PostMatchCSS.container}>
            <label>End Date</label>
            <input type="date" name='endDate' value={endDate} onChange={onChange} required className={PostMatchCSS.input}/>
          </div>

          <div>
            <label>Dedicated day for top 8</label>
            <input type="checkbox" name="top8Day" value={top8Day} onChange={onChangeCheckedTop8Day}/>
          </div>

          <div className={PostMatchCSS.container}>
            {(getTimeDifference(startDate, endDate) > -1) 
              && Array.from(Array(getTimeDifference(startDate, endDate) + !top8Day),
               (e, i) => <div key={i}>
                <label>Last swiss round of day {i + 1}: </label>
                <input type="number" value={dayRoundArr[i]} index={i} onChange={(e) => onChangeDayRoundArray(e)} style={{width: '50px'}}/>
            </div>)}
            {top8Day && <div>
              <label>Day {getTimeDifference(startDate, endDate) + 1}: Top 8 only</label>
            </div>}
          </div>
        </> }

        
        <div className={PostMatchCSS.container}>
          <label>Description</label>
          <textarea name="description" cols="30" rows="5" value={description} onChange={onChange}  className={PostMatchCSS.input}></textarea>
        </div>
        <button type="submit" form="form1" value="Submit" className={PostMatchCSS.submitButton}> 
          {eventLoading ? <ClipLoader color='white' size={20}/>
           : <>Submit</>}
        </button>
      </form>

      <Popup trigger={deletePopup}>
        <div>
          <h1>Are you sure you want to <b style={{color: 'red'}}>delete</b> this Event? </h1>
        <div>It can be restored from the recycle bin at anytime if deleted.</div>
        </div>
        <div className={PostMatchCSS.popupButtons}>
          {eventLoading ? <ClipLoader size={25}/> : <>
            <button className={PopupCSS.deleteButton} onClick={onDelete}>Delete</button>
            <button className={PopupCSS.cancelButton} onClick={(e) => {e.preventDefault(); setDeletePopup(false)}}>Cancel</button>
          </>}
        </div>
      </Popup>

    </div>
  )
}
export default PostEvent