import LoginCSS from './styles/Login.module.css'
import HeroSelectCSS from '../assets/styles/HeroSelect.module.css'
import PostMatchCSS from './styles/PostMatch.module.css'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {postEvent, getEvent} from '../../service/EventService'

function PostEvent() {
  const {eventid} = useParams()
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    format: 'Classic Constructed',
    startDate: '',
    endDate: '',
    description: ''
  })

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
  }

  return (
    <div className={LoginCSS.parent}>
      <form onSubmit={onSubmit} className={LoginCSS.form}>
        <div className={LoginCSS.container}>
          <label>Event Name</label>
          <input type="text" name='name' value={name} onChange={onChange} required className={LoginCSS.input}/>
        </div>
        <div className={LoginCSS.container}>
          <label>Location Name</label>
          <input type="text" name='location' value={location} onChange={onChange} required className={LoginCSS.input}/>
        </div>
        <div className={LoginCSS.container}>
          <label>Format</label>
          <select name="format" className={HeroSelectCSS.select} onChange={onChange} value={format}>
            <option value="Classic Constructed">Classic Constructed</option>
            <option value="Blitz">Blitz</option>
            <option value="Draft">Draft</option>
            <option value="Sealed">Sealed</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>
        <div className={LoginCSS.container}>
          <label>Start Date</label>
          <input type="date" name='startDate' value={startDate} onChange={onChange} required className={LoginCSS.input}/>
        </div>
        <div className={LoginCSS.container}>
          <label>End Date</label>
          <input type="date" name='endDate' value={endDate} onChange={onChange} required className={LoginCSS.input}/>
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
export default PostEvent