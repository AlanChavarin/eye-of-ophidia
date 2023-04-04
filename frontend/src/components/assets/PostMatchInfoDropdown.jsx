import { useState, useEffect} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons"
import PostMatchInfoDropdownCSS from './styles/PostMatchInfoDropdown.module.css'

function PostMatchInfoDropdown() {

  const [active, setActive] = useState(false)

  useEffect(() => {
    active ? document.addEventListener('mousedown', onClick) : 
    document.removeEventListener('mousedown', onClick)
  }, [active]) 

  const onClick = () => {
    setActive(!active)
  }

  return (
    <div>
      <button type='button' onClick={() => onClick()} className={PostMatchInfoDropdownCSS.button}><FontAwesomeIcon icon={faCircleInfo}/></button>
      {active && 
        <p className={PostMatchInfoDropdownCSS.p}>
          Pasting a Youtube link here will automatically fill in the timestamp and video ID fields automatically. <br />
          To copy a Youtube link with the timestamp included, on Youtube.com, right click the video and click "Copy video URL at current time"
        </p>
      }
    </div>
  )
}
export default PostMatchInfoDropdown