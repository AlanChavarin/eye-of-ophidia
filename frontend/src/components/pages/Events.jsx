//react
import { useEffect, useState } from 'react'
import {useSearchParams} from 'react-router-dom'

//service
import useEventService from "../../service/useEventService"

//assets
import EventThumbnail from '../assets/EventThumbnail'
import SearchForm from '../assets/SearchForm'

//css
import EventsCSS from './styles/Events.module.css'
import CommentsCSS from '../assets/styles/Comments.module.css'

//loader
import MoonLoader from 'react-spinners/MoonLoader'

//helper
import getQuery from '../../helpers/getQuery'

//assets
import PageButtons from '../assets/PageButtons'

function Events() {
  const {eventLoading, getEvents} = useEventService()
  const [searchParams] = useSearchParams()
  const [events, setEvents] = useState()

  const {text, startDate, endDate, recyclebin, order, page} = getQuery()

  const limit = 35
  const [count, setCount] = useState('')

  useEffect(() => {
    setEvents()
    getEvents(text, startDate, endDate, page, limit, order, recyclebin)
    .then(data => {
      setEvents(data.events)
      setCount(data.count)
    })
  }, [searchParams, page, order])

  return (
    <div className={EventsCSS.parent}>
      <SearchForm page='events'/>
      
      <div className={EventsCSS.eventThumbnails}>
        <MoonLoader size={70} loading={eventLoading}/> 
        {events?.map((event) => (
          <EventThumbnail event={event} key={event._id} page='event' recyclebin={recyclebin}/>
        ))}  
        {!count && <p style={{fontWeight: '600'}}>Search query found no events. </p>}
      </div>
      <PageButtons count={count} limit={limit} />
    </div>
    
  )
}
export default Events