//react
import {useReducer, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

//reducer
import { postEventReducer, INITIAL_STATE } from './postEventReducer'

//service
import useEventService from '../../../service/useEventService'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

//assets
import Popup from '../../assets/Popup'
import EventThumbnail from '../../assets/EventThumbnail'
import EventHero from '../event/EventHero'
import TabSelector from '../../assets/TabSelector'

//css
import PostMatchCSS from '../styles/PostMatch.module.css'
import HeroSelectCSS from '../../assets/styles/HeroSelect.module.css'
import PopupCSS from '../../assets/styles/Popup.module.css'
import PostEventCSS from '../styles/PostEvent.module.css'

//loader
import MoonLoader from 'react-spinners/MoonLoader'
import ClipLoader from 'react-spinners/ClipLoader'

//helpers
import { getTimeDifference } from '../../../helpers/timeDifference'
import useImageCompression from './useImageCompression'
import BackgroundImageSelector from './BackgroundImageSelector'



function PostEvent() {
  const navigate = useNavigate()
  const {eventid} = useParams()
  const {eventLoading, getEvent, postEvent, deleteEvent, deleteBackgroundImage} = useEventService()
  const [state, dispatch] = useReducer(postEventReducer, INITIAL_STATE)
  
  const {form, isMultiDay, deletePopup, previewTab} = state
  const {name, location, format, startDate, endDate, top8Day, description, dayRoundArr, notATypicalTournamentStructure, resetImage, image, bigImage, backgroundPosition} = form

  const {smallImageCompression, bigImageCompression, progress} = useImageCompression()

  useEffect(() => {
    if(eventid){
      getEvent(eventid)
      .then(data => {
        data.startDate = data.startDate?.substring(0,10)
        data.endDate = data.endDate?.substring(0,10)
        dispatch({type: 'SET_FORM', payload: data})
        if(data.endDate){
          dispatch({type: 'UPDATE_ISMULTIDAY', payload: true})
        }
      })
    }
  }, [])

  const onChange = (e) => {
    dispatch({type: 'UPDATE_FORM', payload: e})
  }

  const onChangeChecked = (e) => {
    dispatch({type: 'UPDATE_FORM_CHECKED', payload: e})
  }

  const onChangeCheckedMultiDay = (e) => {
    dispatch({type: 'UPDATE_ISMULTIDAY', payload: e.target.checked})
  }

  const onChangeCheckedTop8Day = (e) => {
    dispatch({type: 'UPDATE_FORM_CHECKED', payload: e})
    if(!e.target.checked){
      dispatch({type: 'UPDATE_DAYROUNDARR', payload: dayRoundArr.slice(0, dayRoundArr.length-1)})
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
    dispatch({type: 'UPDATE_DAYROUNDARR', payload: tempArr})
  }

  const onChangeImage = async (e) => {
    const imageFile = e.target.files[0]
    const smallCompressedImage = await smallImageCompression(imageFile)
    const bigCompressedImage = await bigImageCompression(imageFile)
    dispatch({type: 'UPDATE_IMAGE', payload: smallCompressedImage})
    dispatch({type: 'UPDATE_BIGIMAGE', payload: bigCompressedImage})
  }

  const onChangeImageLink = (smallLink, bigLink) => {
    dispatch({type: 'UPDATE_IMAGE', payload: smallLink})
    dispatch({type: 'UPDATE_BIGIMAGE', payload: bigLink})
  }

  const onChangeBackgroundPosition = (e) => {
    dispatch({type: 'UPDATE_BACKGROUNDPOSITION', payload: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    postEvent(form, eventid)
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

  // const onDeleteBackgroundImage = (e) => {
  //   e.preventDefault()
  //   deleteBackgroundImage(image, bigImage)
  //   .then(data => {
  //     onChangeImageLink(null, null)
  //   })
  // }

  const setPreviewTab = (tab) => {
    dispatch({type: 'UPDATE_PREVIEWTAB', payload: tab})
  }

  return (
    <div className={PostMatchCSS.parent}>
      <form onSubmit={onSubmit} className={PostEventCSS.form} id="form1" encType="multipart/form-data">
      {(eventid && !form?.name) && <div><MoonLoader size={20} />Fetching event data...</div>}
        <h3 style={{alignSelf: 'center'}}>{(eventid) ? (<>Edit Event</>):(<>Post New Event</>)}</h3>
        {eventid && <button className={PostMatchCSS.deleteButton} style={{position: 'absolute'}} onClick={(e) => {e.preventDefault(); dispatch({type: 'UPDATE_DELETEPOPUP', payload: true})}}><FontAwesomeIcon icon={faTrash} /></button>}

        <div className={PostMatchCSS.container}>
          <label>Event Name <span style={{color: 'red'}}>*</span></label>
          <input type="text" name='name' value={name} onChange={onChange} required className={PostMatchCSS.input} data-cy="eventName"/>
        </div>
        
        <div className={PostMatchCSS.container}>
          <label>Location Name <span style={{color: 'red'}}>*</span></label>
          <input type="text" name='location' value={location} onChange={onChange} required className={PostMatchCSS.input} data-cy="eventLocation"/>
        </div>

        <div className={PostMatchCSS.container}>
          <label>Format <span style={{color: 'red'}}>*</span></label>
          <select name="format" className={HeroSelectCSS.select} onChange={onChange} value={format} data-cy="eventFormat">
            <option value="Classic Constructed">Classic Constructed</option>
            <option value="Blitz">Blitz</option>
            <option value="Draft">Draft</option>
            <option value="Sealed">Sealed</option>
            <option value="Living Legend">Living Legend</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>

        <div>
          <label style={{fontSize: '12px'}}>Non-conventional tournament structure.</label>
          <input type="checkbox" checked={notATypicalTournamentStructure} name='notATypicalTournamentStructure' value={notATypicalTournamentStructure} onChange={onChangeChecked}/>
        </div>

        <div>
          <label>Multiday Event</label>
          <input type="checkbox"  value={isMultiDay} onChange={onChangeCheckedMultiDay} data-cy="eventMultidayCheckbox"/>
        </div>

        <div className={PostMatchCSS.container}>
          {(getTimeDifference(startDate, endDate) > 4 && !notATypicalTournamentStructure) &&
             <span style={{color: '#ab2424'}}>
              Event spans too many days for a conventional tournament structure (max 5). Change dates or check "Non-conventional tournament structure" on.
            </span>}
          <label>{isMultiDay ? <>Start Date</> : <>Date</>} </label>
          <input data-cy="eventStartDate" type="date" name='startDate' value={startDate} onChange={onChange} required className={PostMatchCSS.input}
          style={{backgroundColor: (getTimeDifference(startDate, endDate) > 4 && !notATypicalTournamentStructure) ? '#ff3333' : ''}}/>
        </div>

        {isMultiDay && <>
          <div className={PostMatchCSS.container} >
            <label>End Date</label>
            <input data-cy="eventEndDate" type="date" name='endDate' value={endDate} onChange={onChange} required className={PostMatchCSS.input}
            style={{backgroundColor: (getTimeDifference(startDate, endDate) > 4 && !notATypicalTournamentStructure) ? '#ff3333' : ''}}/>
          </div>
        </>}
 
        {(isMultiDay && !notATypicalTournamentStructure && (getTimeDifference(startDate, endDate) < 5)) && <>
          <div>
            <label>Dedicated day for top 8</label>
            <input type="checkbox" name="top8Day" value={top8Day} onChange={onChangeCheckedTop8Day} data-cy="eventTop8DayCheckbox"/>
          </div>

          <div className={PostMatchCSS.container}>
            {(getTimeDifference(startDate, endDate) > -1) 
              && Array.from(Array(getTimeDifference(startDate, endDate) + !top8Day),
               (e, i) => <div key={i}>
                <label>Last swiss round of day {i + 1}: </label>
                <input data-cy={'dayRound' + i} type="number" value={dayRoundArr[i]} index={i} onChange={(e) => onChangeDayRoundArray(e)} style={{width: '50px'}}/>
            </div>)}
            {top8Day && <div>
              <label>Day {getTimeDifference(startDate, endDate) + 1}: Top 8 only</label>
            </div>}
          </div>
        </> }
        
        <div className={PostMatchCSS.container}>
          <label>Description</label>
          <textarea name="description" cols="30" rows="5" value={description} onChange={onChange}  className={PostMatchCSS.input} data-cy="eventDescription"></textarea>
        </div> 

        <div className={PostMatchCSS.container} style={{display: 'flex', flexDirection: 'column'}}>
          <label data-cy="eventChooseFileLabel">Thumbnail Image {progress && <span data-cy="fileCompressionStatusSpan"> - Compressing: {progress}%</span>}</label>
          <input type="file" onChange={onChangeImage} data-cy="eventChooseFile"/>
        </div>

        <div className={PostMatchCSS.container}>
          <label>Choose from uploaded images</label>
          <BackgroundImageSelector onChange={onChangeImageLink} image={image}/>
        </div>

        <div>
          <label>Adjust hero background offset %: </label>
          <input type="number" min='0' max='100' onChange={onChangeBackgroundPosition} value={backgroundPosition} data-cy="eventOffset"/>
        </div>

        <div className={PostMatchCSS.container}>
          <TabSelector 
            tabsArray={['Preview Thumbnail', 'Preview Hero']}
            selectedTab={previewTab}
            setSelectedTab={setPreviewTab}
          />
          {previewTab==='Preview Thumbnail' && 
            <EventThumbnail event={form} page='event' disableLink={true}/>
          }
          {previewTab==='Preview Hero' && 
            <EventHero event={form} />
          }
          
        </div>

        <div>
          <label>Reset image to default? (will not upload image)</label>
          <input type="checkbox" name="resetImage" value={resetImage} onChange={onChangeChecked} data-cy="eventResetImageCheckbox"/>
        </div>

        <button type="submit" form="form1" value="Submit" className={PostMatchCSS.submitButton} data-cy="eventFormSubmitButton"> 
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
            <button className={PopupCSS.cancelButton} onClick={(e) => {e.preventDefault(); dispatch({type: 'UPDATE_DELETEPOPUP', payload: false})}}>Cancel</button>
          </>}
        </div>
      </Popup>

    </div>
  )
}
export default PostEvent