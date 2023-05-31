import {useState} from 'react'
import EditHistoryCSS from './styles/EditHistory.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

function EditHistory({editHistory, previousHistory, pages}) {
    const [dropdown, setDropdown] = useState(false)

    const onClick = () => {
      dropdown ? setDropdown(false) : setDropdown(true)
    }

    const a = ['name', 'location', 'format', 'startDate', 'endDate', 'description', 'editor', 'parentEvent', 'timeStamp', 'image', 'bigImage', 'backgroundPosition']
    const h = (i) => {
      if(!previousHistory){
        return ''
      } else if(editHistory[a[i]] != previousHistory[a[i]]){
        return EditHistoryCSS.edit
      } else {
        return ''
      }
    }
    //const type = (previousHistory ? 'Change' : 'First post')
    const type = 'Change'

  return (
    <div>
      <button 
      className={`${EditHistoryCSS.dropdownButton}`} 
      onClick={onClick}>
        {type} by {editHistory.editorName} at {editHistory.createdAt.slice(0,10)}
        <FontAwesomeIcon icon={dropdown ? faCaretDown : faCaretUp} className={EditHistoryCSS.icon} />
      </button>
      {dropdown && ( 
        <div className={EditHistoryCSS.dropdown}>
          <div>
            <div><b>{type} submitted at: </b>{editHistory.updatedAt.slice(0, 10)}</div>
            <div><b>{type} submitted by: </b>{editHistory.editorName}</div>
          </div>
          <div>
            <div className={`${h(0)}`}><b>Event Name: </b>{editHistory.name}</div>
          </div>
          <div>
            <div className={`${h(1)}`}><b>Location: </b>{editHistory.location}</div>
          </div>
          <div>
            <div className={`${h(2)}`}><b>Format: </b>{editHistory.format}</div>
          </div>
          <div>
            <div className={`${h(3)}`}><b>Start Date: </b>{editHistory.startDate}</div>
            <div className={`${h(4)}`}><b>End Date: </b>{editHistory.endDate}</div>
          </div>
          <div>
            <div className={`${h(5)}`}><b>Description: </b>{editHistory.description}</div>
          </div>
          <div>
            <div className={`${h(6)}`}><b>Dedicated Top 8 Day: </b>{editHistory.top8day ? 'Yes' : 'No'}</div>
            <div className={`${h(7)}`}><b>Rounds per day array:</b>{editHistory?.dayRoundArr?.length}</div>
          </div>
          <div>
            <div className={`${h(9)}`}><b>Thumbnail Image Link: </b>{editHistory?.image}</div>
            <div className={`${h(10)}`}><b>Header Image Link: </b>{editHistory?.bigImage}</div>
            <div className={`${h(11)}`}><b>BG Position: </b>{editHistory?.backgroundPosition}</div>
          </div>
        </div>
      )}
    </div>
  )
}
export default EditHistory