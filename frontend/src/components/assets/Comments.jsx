import {useState, useEffect, useContext} from 'react'
import UserContext from '../../context/UserContext'
import CommentsCSS from './styles/Comments.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import useCommentService from '../../service/useCommentService'
import Popup from './Popup'
import PopupCSS from '../assets/styles/Popup.module.css'

function Comments({matchid}) {
  const {getComments, postComment, deleteComment} = useCommentService()
  const [comments, setComments] = useState()
  const [newCommentBody, setNewCommentBody] = useState('')
  const {userData} = useContext(UserContext)
  const [popup, setPopup] = useState(false)
  const [currDelCommentId, setCurrDelCommentId] = useState('')

  useEffect(() => {
    getComments(matchid, true)
    .then(data => setComments(data))
  }, [])

  const onChange = (e) => {
    setNewCommentBody(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await postComment(newCommentBody, matchid)
    setComments(await getComments(matchid, true))
    setNewCommentBody('')
  }

  const onDelete = async () => {
    setPopup(false)
    await deleteComment(currDelCommentId)
    setComments(await getComments(matchid, true))
  }

  const promptDelete = (e) => {
    setPopup(true)
    setCurrDelCommentId(e.target.parentElement.getAttribute('commentid'))
  }

  const cancelDelete = (e) => {
    e.preventDefault()
    setPopup(false)
    setCurrDelCommentId('')
  }

  return (
    <div className={CommentsCSS.parent}>
      <hr />
      {comments?.map((comment) => (<>
        <div key={comment._id} commentid={comment._id} className={CommentsCSS.comment}>
          {(userData?.privilege === 'admin') ? (<button className={CommentsCSS.deleteButton} onClick={(e) => promptDelete(e)} commentid={comment._id}><FontAwesomeIcon icon={faTrash} /></button>) : <></>}
          <img src={window.location.origin + `/profilePics/${comment.ownerDetails?.picture}.png`}/>
          <div>
            <div className={CommentsCSS.commenter}>{comment.ownerDetails?.name}</div>
            <div className={CommentsCSS.commentContainer}>
              <div className={CommentsCSS.commentBody}>{comment.body}</div>
            </div>
          </div>
        </div>
        <hr />
      </>))}
      {((userData?.name) ? (
        <form onSubmit={onSubmit} className={CommentsCSS.form}>
          <textarea placeholder='Leave a comment on this match!' name="newCommentBody" rows='4' cols='30' value={newCommentBody} onChange={onChange} id=""  className={CommentsCSS.textarea}>Comment</textarea>
          <input type='submit' value='Comment' className={CommentsCSS.submitButton}/>
        </form>
      ) : <></>)}
      <Popup trigger={popup}>
        <div>
          <h1>Are you sure you want to <b style={{color: 'red'}}>delete</b> this comment? </h1>
          <div>It cannot be restored</div>
        </div>
        <div className={PopupCSS.popupButtons}>
          <button className={PopupCSS.deleteButton} onClick={() => onDelete()}>Delete</button>
          <button className={PopupCSS.cancelButton} onClick={(e) => cancelDelete(e)}>Cancel</button>
        </div>
      </Popup>
    </div>
  )
}
export default Comments