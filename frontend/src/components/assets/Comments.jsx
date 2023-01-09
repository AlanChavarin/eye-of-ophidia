import {useState, useEffect, useContext} from 'react'
import UserContext from '../../context/UserContext'
import {getComments, postComment, deleteComment} from '../../service/CommentService'
import CommentsCSS from './styles/Comments.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function Comments({matchid}) {
  const [comments, setComments] = useState()
  const [newCommentBody, setNewCommentBody] = useState('')
  const {userData} = useContext(UserContext)

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

  const onDelete = async (e) => {
    await deleteComment(e)
    setComments(await getComments(matchid))
  }

  return (
    <div className={CommentsCSS.parent}>
      {comments?.map((comment) => (
        <div key={comment._id} commentid={comment._id} className={CommentsCSS.comment}>
          <div className={CommentsCSS.commenter}>{comment.owner}</div>
          <div className={CommentsCSS.commentContainer}>
            <div className={CommentsCSS.commentBody}>{comment.body}</div>
            {(userData?.privilege === 'admin') ? (<button className={CommentsCSS.deleteButton} onClick={onDelete}><FontAwesomeIcon icon={faTrash} /></button>) : <></>}
          </div>
        </div>
      ))}
      {((userData?.name) ? (
        <form onSubmit={onSubmit} className={CommentsCSS.form}>
          <textarea placeholder='Leave a comment on this match!' name="newCommentBody" rows='4' cols='30' value={newCommentBody} onChange={onChange} id=""  className={CommentsCSS.textarea}>Comment</textarea>
          <input type='submit' value='Comment' className={CommentsCSS.submitButton}/>
        </form>
      ) : <></>)}
    </div>
  )
}
export default Comments