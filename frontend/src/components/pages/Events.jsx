import { useEffect, useState } from 'react'
import {useSearchParams} from 'react-router-dom'
import useEventService from "../../service/useEventService"
import EventThumbnail from '../assets/EventThumbnail'
import EventsCSS from './styles/Events.module.css'

function Events() {
  const {getEvents} = useEventService()
  const [searchParams, setSearchParams] = useSearchParams()
  const [events, setEvents] = useState()

  useEffect(() => {
    getEvents()
    .then(data => {
      setEvents(data)
    })
  }, [searchParams])

  return (
    <div className={EventsCSS.eventThumbnails}>
      {events?.map((event) => (
        <EventThumbnail event={event} key={event._id} type={'eventPage'}/>
      ))}  
    </div>
  )
}
export default Events