//react
import { useEffect, useState, useContext } from 'react'

//service
import useLiveEventService from '../../service/useLiveEventService'

//faicons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

//css
import LiveEventCSS from './styles/LiveEvent.module.css'
import PostMatchCSS from '../pages/styles/PostMatch.module.css'

//cliploader
import ClipLoader from 'react-spinners/ClipLoader'

//helpers
import { getYoutubeParams } from '../../helpers/YoutubeParams'
import { getTwitchChannelName } from '../../helpers/TwitchParams'

//context
import UserContext from '../../context/UserContext'

function LiveEvent() {
    const {userData} = useContext(UserContext)
    const {getLiveEvent, postLiveEvent, liveEventLoading} = useLiveEventService()
    const [liveEvent, setLiveEvent] = useState({
      site: '',
      link: '',
    })
    const [dropdown, setDropdown] = useState(false)
    const [formData, setFormData] = useState({
      site: '',
      link: '',
    })
    const [fullLink, setFullLink] = useState('')

    useEffect(() => {
      getLiveEvent()
      .then(data => setLiveEvent(data))
    }, [])

    const onClick = (newValue) => {
      setDropdown(newValue)
    }

    const onSubmit = (e) => {
      e.preventDefault()
      postLiveEvent(formData.link, formData.site)
      .then(() => {
        setFormData({
          site: '',
          link: '',
        })
        setFullLink('')
        setDropdown(false)
        getLiveEvent()
        .then(data => setLiveEvent(data))
      })
    }

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }

    const onChangeLink = (e) => {
      setFullLink(e.target.value)
    }

    useEffect(() => {
      let id
      if(formData.site === 'youtube'){
        id = getYoutubeParams(fullLink)[0]
      } else  if (formData.site === 'twitch'){
        id = getTwitchChannelName(fullLink)
      } else {
        id = ''
      }
      setFormData((prevState) => ({
        ...prevState,
        link: id
      }))
    }, [fullLink])


  return (
    <div className={`${liveEvent.link ? '' : LiveEventCSS.moveToBottom} ${LiveEventCSS.parent}`}>
      
      {!dropdown ? 
        <>{liveEvent.link && 
          <div className={LiveEventCSS.videoContainer}>
            {liveEvent.site === 'youtube' && <iframe src={`https://www.youtube.com/embed/${liveEvent.link}?&rel=0`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}

            {liveEvent.site === 'twitch' && <iframe src={`https://player.twitch.tv/?channel=${liveEvent.link}&parent=${process.env.NODE_ENV==='production' ? 'www.eyeofophidia.net' : 'localhost'}`} frameborder="0" allowfullscreen="true" scrolling="no"></iframe>}
          </div>
        }</> : <div className={LiveEventCSS.formParent}>

            <button className={LiveEventCSS.xButton} onClick={() => onClick(false)}>
              <FontAwesomeIcon icon={faX}/>
            </button>

            <form onSubmit={(e) => onSubmit(e)} className={PostMatchCSS.form} id='form1'>
            <h3>Submit Live Event</h3>
            <div><span style={{fontSize: '13px'}}>(Submit empty form to remove live event)</span></div>
            <div className={PostMatchCSS.container}>
              <div>
                <label>Youtube</label>
                <input type="radio" name='site' value={'youtube'} onChange={onChange}/>
              </div>
              <div>
                <label>Twitch</label>
                <input type="radio" name='site' value={'twitch'} onChange={onChange}/>
              </div>
            </div>

            {formData.site && <>
              <div className={PostMatchCSS.container}>
                <label>{formData.site} link</label>
                <input type="text" value={fullLink} onChange={onChangeLink}/>
              </div>
              
              <div className={PostMatchCSS.container}>
                <label>{formData.site} link id</label>
                <input type="text" name='link' value={formData.link} onChange={onChange}/>
              </div>
            </>}
            

            <button type="submit" form="form1" value="Submit" className={PostMatchCSS.submitButton}> 
              {liveEventLoading ? <ClipLoader color='white' size={20}/>
              : <>Submit</>}
            </button>
          </form>
        </div>
      }
      {(!dropdown && (userData.privilege==='admin' || userData.privilege==='moderator')) && <button className={LiveEventCSS.xButton} style={{position: 'static'}} onClick={() => onClick(true)}>
        Submit Live Event
      </button>}
    </div>
  )
}
export default LiveEvent