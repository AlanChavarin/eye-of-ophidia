//react
import { useState, useEffect } from "react"

//css
import BackgroundAdjusterCSS from './BackgroundAdjuster.module.css'
import EventCSS from './Event.module.css'
import PostMatchCSS from '../styles/PostMatch.module.css'

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'

//cliploader
import ClipLoader from "react-spinners/ClipLoader"

//service
import useEventService from "../../../service/useEventService"

function EventBackgroundAdjuster({backgroundPosition, setBackgroundPosition, eventid}) {
    const {eventLoading, editBackgroundPosition} = useEventService()

    const [active, setActive] = useState(false)

    const onClick = (e) => {
        e.preventDefault()
        document.addEventListener('mousedown', outsideClick)
        setActive(!active)
    }

    const outsideClick = (e) => {
        if(active && (e.target.getAttribute('dropdownelement')!=='true')){
            setActive(false)
            document.removeEventListener('mousedown', outsideClick)
        }
    }

    const onChange = (e) => {
        e.preventDefault()
        setBackgroundPosition(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        editBackgroundPosition(backgroundPosition, eventid)
    }

    useEffect(() => {
        document.addEventListener('mousedown', outsideClick)
    }, [active])

  return (
    <div dropdownelement='true' className={BackgroundAdjusterCSS.parent}>
        {active && 
            <form className={BackgroundAdjusterCSS.form} dropdownelement='true' onSubmit={onSubmit} id='form1'>
                <label className={BackgroundAdjusterCSS.label}>Offset in %: </label>
                <input type="number" max='100' min='0' dropdownelement='true' className={BackgroundAdjusterCSS.input} value={backgroundPosition} onChange={onChange}/>
                <button type="submit" form="form1" value="Submit" className={PostMatchCSS.submitButton}  dropdownelement='true'> 
                    {eventLoading ? <ClipLoader color='white' size={20}/>
                    : <>Submit</>}
                </button>
            </form>
        }
        {!active && 
            <button className={`${EventCSS.cornerItem} ${BackgroundAdjusterCSS.button}`} onClick={onClick}>BG position <FontAwesomeIcon icon={faCaretUp} /></button>
        }
    </div>
  )
}
export default EventBackgroundAdjuster