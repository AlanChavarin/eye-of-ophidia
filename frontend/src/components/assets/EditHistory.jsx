import {useState} from 'react'
import EditHistoryCSS from './styles/EditHistory.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

function EditHistory({editHistory, previousHistory, page}) {
    const [dropdown, setDropdown] = useState(false)

    const onClick = () => {
      dropdown ? setDropdown(false) : setDropdown(true)
    }

    const a = ['player1name', 'player1deck', 'player1hero', 'player2name', 'player2deck', 'player2hero', 'event?.name', 'top8', 'top8Round', 'swissRound', 'format', 'link', 'timeStamp']
    const h = (i) => {
      if(!previousHistory){
        return ''
      } else if(editHistory[a[i]] != previousHistory[a[i]]){
        return EditHistoryCSS.edit
      } else {
        return ''
      }
    }
    //const type = ((previousHistory) ? 'Change' : 'First post')
    const type = 'Change'

  return (
    <div>
      <button 
      className={`${EditHistoryCSS.dropdownButton}`} 
      onClick={onClick}>
        {type} by {editHistory.editorName} at {editHistory.createdAt.slice(0, 10)}
        <FontAwesomeIcon icon={dropdown ? faCaretDown : faCaretUp} className={EditHistoryCSS.icon} />
      </button>
      {dropdown && ( 
        <div className={EditHistoryCSS.dropdown}>
          <div>
            <div><b>{type} submitted at: </b>{editHistory.updatedAt.slice(0, 10)}</div>
            <div><b>{type} submitted by: </b>{editHistory.editorName}</div>
          </div>
          <div>
            <div className={`${h(0)}`}><b>Player 1 Name: </b>{editHistory.player1name}</div>
            <div className={`${h(1)}`}><b>Player 1 Deck: </b>{editHistory.player1deck}</div>
            <div className={`${h(2)}`}><b>Player 1 Hero: </b>{editHistory.player1hero}</div>
          </div>
          <div>
            <div className={`${h(3)}`}><b>Player 2 Name: </b>{editHistory.player2name}</div>
            <div className={`${h(4)}`}><b>Player 2 Deck: </b>{editHistory.player2deck}</div>
            <div className={`${h(5)}`}><b>Player 2 Hero: </b>{editHistory.player2hero}</div>
          </div>
          <div>
            <div className={`${h(6)}`}><b>Event: </b>{editHistory.event?.name}</div>
            <div className={`${h(7)}`}><b>Top 8: </b>{`${editHistory.top8 ? 'true':'false'}`}</div>
            {(editHistory.top8) ? 
              <div className={`${h(8)}`}><b>Top 8 Round: </b>{editHistory.top8Round}</div> : 
              <div className={`${h(9)}`}><b>Swiss Round: </b>{editHistory.swissRound}</div>
            }
            <div className={`${h(10)}`}><b>Format: </b>{editHistory.format}</div>
            <div className={`${h(11)}`}><b>Video Link ID: </b>{editHistory.link}</div>
            <div className={`${h(12)}`}><b>Timestamp: </b>{editHistory.timeStamp}</div>
          </div>
        </div>
      )}
    </div>
  )
}
export default EditHistory