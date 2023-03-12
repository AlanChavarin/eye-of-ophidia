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

function Events() {
  const {getEvents} = useEventService()
  const [searchParams, setSearchParams] = useSearchParams()
  const [events, setEvents] = useState()

  const limit = 10
  const [page, setPage] = useState(0)
  const [count, setCount] = useState('')

  const text = searchParams.get('text')

  useEffect(() => {
    getEvents(text, page, limit)
    .then(data => {
      setEvents(data.events)
      setCount(data.count)
    })
  }, [searchParams, page])

  return (
    <div className={EventsCSS.parent}>
      <SearchForm page='events'/>
      <div className={EventsCSS.eventThumbnails}>
      {events?.map((event) => (
        <EventThumbnail event={event} key={event._id} page='event'/>
      ))}  
      </div>
      <div className={CommentsCSS.pageButtons}>
        {count && Array.from(Array(Math.floor(count/limit + 1)), (e, i) => <button className={i===page && CommentsCSS.selectedButton} onClick={() => setPage(i)}>{i+1}</button>)}
      </div>
    </div>
    
  )
}
export default Events