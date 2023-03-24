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

function Events() {
  const {eventLoading, getEvents} = useEventService()
  const [searchParams] = useSearchParams()
  const [events, setEvents] = useState()

  const limit = 10
  const [page, setPage] = useState(0)
  const [count, setCount] = useState('')

  const text = searchParams.get('text')
  let recyclebin = searchParams.get('recyclebin')
  !recyclebin && (recyclebin=false)
  const order = searchParams.get('order')

  useEffect(() => {
    setEvents()
    getEvents(text, page, limit, order, recyclebin)
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
      </div>
      <div className={CommentsCSS.pageButtons}>
        {count && Array.from(Array(Math.floor(count/limit + 1)), (e, i) => <button className={i===page && CommentsCSS.selectedButton} onClick={() => setPage(i)}>{i+1}</button>)}
      </div>
    </div>
    
  )
}
export default Events