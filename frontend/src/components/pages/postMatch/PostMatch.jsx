//react
import {useReducer, useEffect} from 'react'
import {useParams, useNavigate, useSearchParams} from 'react-router-dom'

//reducer
import { postMatchReducer, INITIAL_STATE } from './postMatchReducer'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

//assets
import Popup from '../../assets/Popup'
import SearchableDropdown from '../../assets/SearchableDropdown'
import HeroSelect from '../../assets/HeroSelect'
import NameSelect from '../../assets/NameSelect'
import PostMatchInfoDropdown from './PostMatchInfoDropdown'

//service
import useEventService from '../../../service/useEventService'
import useMatchService from '../../../service/useMatchService'

//css
import PostMatchCSS from '../styles/PostMatch.module.css'
import HeroSelectCSS from '../../assets/styles/HeroSelect.module.css'
import PopupCSS from '../../assets/styles/Popup.module.css'

//loader
import MoonLoader from 'react-spinners/MoonLoader'
import ClipLoader from 'react-spinners/ClipLoader'

function PostMatch() {
  const {matchLoading, postMatch, getMatch, deleteMatch, getNameLinkPairs} = useMatchService()
  const {getEvents} = useEventService()
  const navigate = useNavigate()
  const {matchid} = useParams()
  const [searchParams] = useSearchParams()

  const [state, dispatch] = useReducer(postMatchReducer, INITIAL_STATE)
  const {form, eventNames, eventData, selectedEventData, deletePopup, heroType, nameLinkPairs, dontUpdateLinks} = state
  const {player1name, player1hero, player1deck, player2name, player2hero, player2deck, event, twitch, twitchTimeStamp, link, format, timeStamp, fullLink, top8, swissRound, top8Round, date} = form

  useEffect(() => {
    getEvents(null, null, null, null, 1000)
    .then(data => {
      dispatch({type: 'SET_EVENTDATA_AND_EVENTNAMES', payload: data})
    }
    )
    .then(() => {
      dispatch({type: 'SET_FORM_BASED_ON_SEARCHPARAMS', payload: searchParams})
    }
    )
    .then(() => {
      matchid && getMatch(matchid)
      .then(data => {
        dispatch({type: 'SET_FORM_EDITING_MATCH', payload: data})
      })
    })
  }, [])

  useEffect(() => {
    dispatch({type: 'SET_LINK_AND_TIMESTAMP', payload: fullLink})
  }, [fullLink])

  useEffect(() => {
    dispatch({type: 'SET_FORMAT_BASED_ON_EVENT_AND_SET_SELECTEDEVENTDATA'})
  }, [event, eventData])

  useEffect(() => {
    dispatch({type: 'SET_HEROTYPE_BASED_ON_FORMAT'})
  }, [format])

  useEffect(() => {
    if(event!=='' && format!==''){
      getNameLinkPairs(event, format)
      .then(data => 
        dispatch({type: 'SET_NAMELINKPAIRS', payload: data})  
      )
    }
  }, [event, format])

  useEffect(() => {
    dispatch({type: 'SET_PLAYER1DECK_BASED_ON_PLAYER1NAME'})
  }, [player1name])

  useEffect(() => {
    dispatch({type: 'SET_PLAYER2DECK_BASED_ON_PLAYER2NAME'})
  }, [player2name])

  useEffect(() => {
    dispatch({type: 'SET_SWISSROUND_OR_TOP8ROUND_BASED_ON_TOP8'})
  }, [top8])

  const onChange = (e) => {
    dispatch({type: 'UPDATE_FORM', payload: e})
  }

  const onChangeChecked = (e) => {
    dispatch({type: 'UPDATE_FORM_CHECKED', payload: e})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    postMatch(form, dontUpdateLinks, matchid)
    .then(match => navigate(`/matches/${match._id}`))
  }
  
  const setDeletePopup = (e, val) => {
    e.preventDefault()
    dispatch({type: 'SET_DELETEPOPUP', payload: val})
  }

  const onDelete = (e) => {
    e.preventDefault()
    deleteMatch(matchid)
    .then(data => {
      if(data){navigate('/')}
    })
  }

  return (
    <div className={PostMatchCSS.parent}>
      <form onSubmit={onSubmit} className={PostMatchCSS.form} id='form1'>
        {(matchid && !form?.link) && <div><MoonLoader size={20} />Fetching match data...</div>}
        <h3 style={{alignSelf: 'center'}}>{(matchid) ? (<>Edit Match</>):(<>Post New Match</>)}</h3>
        {matchid && <button className={PostMatchCSS.deleteButton} style={{position: 'absolute'}} onClick={(e) => setDeletePopup(e, true)}><FontAwesomeIcon icon={faTrash} /></button>}
        
        <div className={PostMatchCSS.container}>
          <label>Event <span style={{color: 'red'}}>*</span></label>
          <SearchableDropdown items={eventNames} onChange={onChange} value={event} name='event' dataCy="matchEvent"/>
        </div>
        <div className={PostMatchCSS.container}>
          <label>Format <span style={{color: 'red'}}>*</span></label>
          <select name="format" className={HeroSelectCSS.select} onChange={onChange} value={format} data-cy="matchFormat">
            <option value=''>None</option>
            <option value="Classic Constructed">Classic Constructed</option>
            <option value="Blitz">Blitz</option>
            <option value="Draft">Draft</option>
            <option value="Living Legend">Living Legend</option>
            <option value="Sealed">Sealed</option>
          </select>
        </div>

        <div className={PostMatchCSS.top8OrSwissContainer}>
          <div className={PostMatchCSS.container}>
            <div>
              <label>Top 8</label>
              <input type="radio" name="top8" value={'true'} required checked={top8==='true'} onChange={onChange} data-cy="matchTop8RadioButton"/>
            </div>
            <div>
              <label>Swiss</label>
              <input type="radio" name="top8" value={'false'} required checked={top8==='false'} onChange={onChange} data-cy="matchSwissRadioButton"/>
            </div>
         </div>
          
          {top8==='true' && 
            <div className={PostMatchCSS.container}>
              <label>Top 8 Round <span style={{color: 'red'}}>*</span></label>
              <select name="top8Round" className={HeroSelectCSS.select} onChange={onChange} value={top8Round} data-cy="matchTop8Round">
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
              <input type="number" name='swissRound' value={swissRound} onChange={onChange} className={PostMatchCSS.input} style={{width: '40px', marginLeft: '5px'}} data-cy="matchSwissRound"/>
            </div>
          }
        </div>

        <div className={PostMatchCSS.container} style={{flexDirection: 'row'}}>
          <label>Twitch.tv link</label>
          <input type="checkbox" checked={twitch} name='twitch' onChange={onChangeChecked} className={PostMatchCSS.input} data-cy="matchTwitchCheckbox"/>
        </div>

        {!twitch ? <>

          <div className={PostMatchCSS.container}>
            <div style={{display: 'flex'}}><label>Youtube Video Link </label><PostMatchInfoDropdown /></div>
            <input type="url" name='fullLink' value={fullLink} onChange={onChange} className={PostMatchCSS.input} data-cy="matchYoutubeVideoLink"/>
          </div>
          <div className={PostMatchCSS.container}>
            <label>Match Timestamp (in total seconds) <span style={{color: 'red'}}>*</span></label>
            <input type="number" name='timeStamp' value={timeStamp} onChange={onChange} required className={PostMatchCSS.input} style={{width: '60px'}} data-cy="matchYoutubeTimeStamp"/>
          </div>
          <div className={PostMatchCSS.container}>
            <label>Youtube Video id <span style={{color: 'red'}}>*</span></label>
            <input type="text" name='link' value={link} onChange={onChange} required className={PostMatchCSS.input} data-cy="matchYoutubeVideoId"/>
          </div>

        </> : <>

          <div className={PostMatchCSS.container}>
            <div style={{display: 'flex'}}><label>Twitch Video Link </label><PostMatchInfoDropdown twitch={true} /></div>
            <input type="url" name='fullLink' value={fullLink} onChange={onChange} className={PostMatchCSS.input} data-cy="matchTwitchVideoLink"/>
          </div>
          <div className={PostMatchCSS.container}>
            <label>Twitch Match Timestamp<span style={{color: 'red'}}>*</span></label>
            <input type="text" name='twitchTimeStamp' value={twitchTimeStamp} onChange={onChange} required className={PostMatchCSS.input} data-cy="matchTwitchTimeStamp"/>
          </div>
          <div className={PostMatchCSS.container}>
            <label>Twitch Video id<span style={{color: 'red'}}>*</span></label>
            <input type="text" name='link' value={link} onChange={onChange} required className={PostMatchCSS.input} data-cy="matchTwitchVideoId"/>
          </div>

        </>}

        <div className={PostMatchCSS.container}>
          <label>Player 1 Hero <span style={{color: 'red'}}>*</span></label>
          <HeroSelect name='player1hero' value={player1hero} onChange={onChange} required={true} type={heroType} className={PostMatchCSS.input} dataCy="matchPlayer1Hero"/>
        </div>
        <div className={PostMatchCSS.container}>
          <label>Player 1 Full Name <span style={{color: 'red'}}>*</span></label>
          <NameSelect name='player1name' value={player1name} onChange={onChange} className={PostMatchCSS.input} dataCy="matchPlayer1FullName"/>
        </div>
        <div className={PostMatchCSS.container}>
          <label>Player 1 Deck Link</label>
          <input type="url" name='player1deck' value={player1deck} onChange={onChange} className={PostMatchCSS.input} data-cy="matchPlayer1DeckLink"/>
        </div>

        <div className={PostMatchCSS.container}>
          <label>Player 2 Hero <span style={{color: 'red'}}>*</span></label>
          <HeroSelect name='player2hero' value={player2hero} onChange={onChange} required={true} type={heroType} className={PostMatchCSS.input} dataCy="matchPlayer2Hero"/>
        </div>
        <div className={PostMatchCSS.container}>
          <label>Player 2 Full Name <span style={{color: 'red'}}>*</span></label>
          <NameSelect name='player2name' value={player2name} onChange={onChange} className={PostMatchCSS.input} dataCy="matchPlayer2FullName"/>
        </div>
        <div className={PostMatchCSS.container}>
          <label>Player 2 Deck Link</label>
          <input type="url" name='player2deck' value={player2deck} onChange={onChange} className={PostMatchCSS.input} data-cy="matchPlayer2DeckLink"/>
        </div>

        {selectedEventData?.notATypicalTournamentStructure && 
          <div className={PostMatchCSS.container}>
            <label>Match Date</label>
            <input type="date" name='date' value={date} onChange={onChange} className={PostMatchCSS.input} data-cy="matchDate"/>
          </div>
        }

        <div className={PostMatchCSS.container} style={{flexDirection: 'row'}}>
          <input type="checkbox" checked={!dontUpdateLinks} 
          onChange={() => dispatch({type: 'SET_DONTUPDATELINKS', payload: !dontUpdateLinks})} className={PostMatchCSS.input} data-cy="matchDontUpdateDeckLinksCheckbox"/> <div style={{fontSize: '.8em'}}>Sync Deck Links (recomended)</div> 
        </div>

        <button type="submit" form="form1" value="Submit" className={PostMatchCSS.submitButton} data-cy="matchSubmitButton"> 
          {matchLoading ? <ClipLoader color='white' size={20}/>
           : <>Submit</>}
        </button>
      </form>

      <Popup trigger={deletePopup}>
        <div>
          <h1>Are you sure you want to <b style={{color: 'red'}}>delete</b> this match? </h1>
        <div>It can be restored from the recycle bin at anytime if deleted.</div>
        </div>
        <div className={PostMatchCSS.popupButtons}>
          {matchLoading ? <ClipLoader size={25}/> : <>
            <button className={PopupCSS.deleteButton} onClick={onDelete}>Delete</button>
            <button className={PopupCSS.cancelButton} onClick={(e) => {setDeletePopup(e, false)}}>Cancel</button>
          </>}
        </div>
      </Popup>

    </div>
    
  )
}
export default PostMatch