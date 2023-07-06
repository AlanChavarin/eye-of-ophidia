//react
import {useParams, useSearchParams, useNavigate} from 'react-router-dom'
import { useReducer, useEffect, useContext } from 'react'
import UserContext from '../../../context/UserContext'

//reducer
import { eventReducer, INITIAL_STATE } from './eventReducer'

//service
import useEventService from '../../../service/useEventService'
import useMatchService from '../../../service/useMatchService'

//assets
import Issues from '../../assets/Issues'
import MatchThumbnail from '../../assets/MatchThumbnail'
import EditHistories from '../../assets/EditHistories'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

//css
import EventCSS from './Event.module.css'

//loader
import MoonLoader from 'react-spinners/MoonLoader'

//helper components
import EventHero from './EventHero'

//helper
import {filter} from './filterHelper'
import { getEventBackgroundImageURL } from './backgroundImageHelper'


function Event() {
    const navigate = useNavigate()
    const {userData} = useContext(UserContext)
    const {eventLoading, getEvent, restoreEvent} = useEventService()
    const {matchLoading, getMatchesByEvent} = useMatchService()

    const {eventid} = useParams()
    const [searchParams] = useSearchParams()

    const [state, dispatch] = useReducer(eventReducer, INITIAL_STATE)
    const {event, matches, backgroundImage, tab, lastRound} = state

    let recyclebin = searchParams.get('recyclebin')
    !recyclebin && (recyclebin=false)

    useEffect(() => {
        getEvent(eventid, recyclebin)
        .then(data => {
            dispatch({type: 'SET_EVENT', payload: data})
            return data
        })
        .then(data => {
            getMatchesByEvent(eventid)
            .then(data => dispatch({type: 'SET_MATCHES_AND_LASTROUND', payload: data}))
            .then(() => {
                dispatch({type: 'SET_BACKGROUNDIMAGE', payload: getEventBackgroundImageURL(data)})
            })
        })
    }, [])

    const setTab = (tab) => {
        dispatch({type: 'SET_TAB', payload: tab})
    }
    
    const restore = () => {
        if(recyclebin){
            restoreEvent(eventid)
            .then(data => {
                data && navigate(`/events/${eventid}`)
            })
        }
    }

    const setBackgroundPosition = (position) => {
        dispatch({type: 'SET_BACKGROUNDPOSITION', payload: position})
    }

  return (
    <div className={EventCSS.parent}>
        <MoonLoader size={100} loading={eventLoading}/>
        {event && (<>
            {/* event container */}
            <EventHero 
                page='eventPage'
                event={event} 
                backgroundImage={backgroundImage} 
                recyclebin={recyclebin} 
                eventid={eventid}
                restore={restore}
                setBackgroundPosition={setBackgroundPosition}
                setTab={setTab}
                lastRound={lastRound}
                eventLoading={eventLoading}


            />

            {(tab==='issues') && (<>
            <button onClick={() => setTab('matches')} className={EventCSS.cornerItem} style={{position: 'relative'}}>Back to event matches <FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
            <Issues targetid={event._id} targetType='event'/>
            </>
            )}

            {/* matches */}
            {(tab==='matches') && 
                <div className={EventCSS.dayGroupings}>
                    <MoonLoader size={70} loading={matchLoading || eventLoading}/> 
                    {(matches && event.endDate && event.dayRoundArr && !event.notATypicalTournamentStructure) ? 
                        <>
                            {Array.from(Array(event.dayRoundArr.length), (e, i) => <div className={EventCSS.labelThumbnailContainer}>
                                <div className={EventCSS.dayLabel}>Day {i + 1}</div>
                                <div className={EventCSS.matchThumbnailContainer}>
                                    {matches.filter(match => filter(match, i, event))
                                        .map((match) => (<MatchThumbnail key={match._id} match={match}/>))}
                                    {(matches.filter(match => filter(match, i, event)).length < 1) && <>No Vods Available :{'('}</>}
                                </div>
                            </div>)}
                            <div className={EventCSS.labelThumbnailContainer}>
                                <div className={EventCSS.dayLabel}>Top8</div>
                                <div className={EventCSS.matchThumbnailContainer}>
                                    {matches.filter(match => match.top8)
                                        .map((match) => (<MatchThumbnail key={match._id} match={match}/>))
                                    }
                                </div>
                            </div>
                        </> 
                        : 
                        <div className={EventCSS.matchThumbnailContainer}>
                            {matches?.map((match) => (<MatchThumbnail key={match._id} match={match}/>))}
                        </div>
                    }
                </div>
            }
            {(tab==='editHistory') && <>
                <button onClick={() => setTab('matches')} className={EventCSS.cornerItem} style={{position: 'relative'}}>Back to event matches <FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
                <EditHistories id={eventid} forPage='event'/>
            </>}
            
            <br />
        </>)}
    </div>
  )
}
export default Event


// const [event, setEvent] = useState()
// const [matches, setMatches] = useState()
// const [backgroundImage, setBackgroundImage] = useState()
// const [tab, setTab] = useState('matches')
// const [lastRound, setLastRound] = useState()

// setMatches(data)
// const round = data[data.length-1]
// if(!round?.top8){
//     setLastRound({
//         top8: false,
//         round: round?.swissRound
//     })
// } else {
//     setLastRound({
//         top8: true,
//         round: round?.top8Round
//     })
// }