import {useState, useEffect, useContext} from 'react'
import UserContext from '../../context/UserContext'
import {getComments, postComment, deleteComment} from '../../service/CommentService'

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
    <div>
      {comments?.map((comment) => (
        <div key={comment._id} commentid={comment._id}>
          <div >{comment.body}</div>
          {(userData?.privilege === 'admin') ? (<button onClick={onDelete}>delete</button>) : <></>}
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