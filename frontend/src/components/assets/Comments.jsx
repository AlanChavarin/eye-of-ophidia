import {useState, useEffect, useContext} from 'react'
import UserContext from '../../context/UserContext'
import {getComments, postComment, deleteComment} from '../../service/CommentService'

function Comments({matchid}) {
  const [comments, setComments] = useState()
  const [newCommentBody, setNewCommentBody] = useState('')
  const {userData} = useContext(UserContext)

  useEffect(() => {
    getComments(setComments, matchid)
  }, [])

  const onChange = (e) => {
    setNewCommentBody(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    postComment(newCommentBody, getComments, setComments, setNewCommentBody, matchid)
  }

  return (
    <div>
      {comments?.map((comment) => (
        <div key={comment._id} commentid={comment._id}>
          <div >{comment.body}</div>
          {(userData?.privilege === 'admin') ? (<button onClick={(e) => deleteComment(e, getComments, setComments, matchid)}>delete</button>) : <></>}
        </div>
      ))}
      {((userData?.name) ? (
        <form onSubmit={onSubmit}>
          <textarea name="newCommentBody" value={newCommentBody} onChange={onChange} id="" cols="60" rows="6">Comment</textarea>
          <input type='submit'/>
        </form>
      ) : <></>)}
      
      
    </div>
  )
}
export default Comments