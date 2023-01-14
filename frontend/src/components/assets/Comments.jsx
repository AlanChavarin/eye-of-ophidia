import {useState, useEffect, useContext} from 'react'
import UserContext from '../../context/UserContext'
import CommentsCSS from './styles/Comments.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import useCommentService from '../../service/useCommentService'
import Popup from './Popup'
import PostMatchCSS from '../pages/styles/PostMatch.module.css'

function Comments({matchid}) {
  const {getComments, postComment, deleteComment} = useCommentService()
  const [comments, setComments] = useState()
  const [newCommentBody, setNewCommentBody] = useState('')
  const {userData} = useContext(UserContext)
  const [popup, setPopup] = useState(false)
  const [currDelCommentId, setCurrDelCommentId] = useState('')

  useEffect(() => {
    getComments(matchid)
    .then(data => setComments(data))
  }, [])

  const onChange = (e) => {
    setNewCommentBody(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await postComment(newCommentBody, matchid)
    setComments(await getComments(matchid))
    setNewCommentBody('')
  }

  const onDelete = async () => {
    setPopup(false)
    await deleteComment(currDelCommentId)
    setComments(await getComments(matchid))
  }

  const promptDelete = (e) => {
    setPopup(true)
    setCurrDelCommentId(e.target.parentElement.parentElement.getAttribute('commentid'))
  }

  const cancelDelete = (e) => {
    e.preventDefault()
    setPopup(false)
    setCurrDelCommentId('')
  }

  return (
    <div className={CommentsCSS.parent}>
      {comments?.map((comment) => (
        <div key={comment._id} commentid={comment._id} className={CommentsCSS.comment}>
          <div className={CommentsCSS.commenter}>{comment.owner}</div>
          <div className={CommentsCSS.commentContainer}>
            <div className={CommentsCSS.commentBody}>{comment.body}</div>
            {(userData?.privilege === 'admin') ? (<button className={CommentsCSS.deleteButton} onClick={(e) => promptDelete(e)} commentid={comment._id}><FontAwesomeIcon icon={faTrash} /></button>) : <></>}
          </div>
        </div>
      ))}
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
        <div className={PostMatchCSS.popupButtons}>
          <button className={PostMatchCSS.deleteButton} onClick={() => onDelete()}>Delete</button>
          <button className={PostMatchCSS.cancelButton} onClick={(e) => cancelDelete(e)}>Cancel</button>
        </div>
      </Popup>
    </div>
  )
}
export default Comments