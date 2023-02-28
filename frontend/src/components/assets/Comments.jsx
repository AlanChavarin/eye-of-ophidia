import {useState, useEffect, useContext} from 'react'
import UserContext from '../../context/UserContext'
import CommentsCSS from './styles/Comments.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import useCommentService from '../../service/useCommentService'
import Popup from './Popup'
import PopupCSS from '../assets/styles/Popup.module.css'

function Comments({matchid}) {
  const {getComments, postComment, deleteComment, getCount} = useCommentService()
  const [comments, setComments] = useState()
  const [newCommentBody, setNewCommentBody] = useState('')
  const {userData} = useContext(UserContext)
  const [popup, setPopup] = useState(false)
  const [currDelCommentId, setCurrDelCommentId] = useState('')

  const limit = 7
  const [page, setPage] = useState(0)
  const [count, setCount] = useState('')

  useEffect(() => {
    runGetComments()
  }, [page])

  const onChange = (e) => {
    setNewCommentBody(e.target.value)
  }

  const runGetComments = () => {
    getComments(matchid, true, page, limit)
    .then(data => setComments(data))
    getCount(matchid)
    .then(data => setCount(data))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await postComment(newCommentBody, matchid)
    runGetComments()
    setNewCommentBody('')
  }

  const onDelete = async () => {
    setPopup(false)
    await deleteComment(currDelCommentId)
    runGetComments()
  }

  const promptDelete = (e, commentid) => {
    setPopup(true)
    setCurrDelCommentId(commentid)
  }

  const cancelDelete = (e) => {
    e.preventDefault()
    setPopup(false)
    setCurrDelCommentId('')
  }

  return (
    <div className={CommentsCSS.parent}>
      <div className={CommentsCSS.pageButtons}>
        {count && Array.from(Array(Math.floor(count/limit + 1)), (e, i) => <button className={i===page && CommentsCSS.selectedButton} onClick={() => setPage(i)}>{i+1}</button>)}
      </div>
      {comments?.map((comment) => (<>
        <div key={comment._id} className={CommentsCSS.comment}>
          {(userData?.privilege === 'admin') ? (<button className={CommentsCSS.deleteButton} onClick={(e) => promptDelete(e, comment._id)}><FontAwesomeIcon icon={faTrash} /></button>) : <></>}
          <img src={window.location.origin + `/profilePics/${comment.ownerDetails?.picture}.png`} className={CommentsCSS.img}/>
          <div>
            <div className={CommentsCSS.commenter}>{comment.ownerDetails?.name}</div>
            <div className={CommentsCSS.commentContainer}>
              <div className={CommentsCSS.commentBody}>{comment.body}</div>
            </div>
          </div>
        </div>
        <hr className={CommentsCSS.hr}/>
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