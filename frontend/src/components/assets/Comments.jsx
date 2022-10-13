import {useState, useEffect, useContext} from 'react'
import UserContext from '../../context/UserContext'

function Comments({matchid}) {
  const API_URL = 'http://localhost:5000/api/comments/'
  const [comments, setComments] = useState()
  const [newCommentBody, setNewCommentBody] = useState('')
  const {userData} = useContext(UserContext)

  useEffect(() => {
    getComments()
  })

  const getComments = () => {
    if(matchid){
      fetch(API_URL + matchid)
      .then(res => res.json())
      .then((data) => {
          if(data.errorMessage){
              throw new Error(data.errorMessage)
          }
          setComments(data)
      })
    } else {
      throw new Error('matchid doesnt exist')
    }
  }

  const onChange = (e) => {
    setNewCommentBody(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    fetch(API_URL + matchid, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('user')
      },
      body: JSON.stringify({
        body: newCommentBody
      })
    })
    .then(res => res.json())
    .then((data) => {
      if(data.errorMessage){
        throw new Error(data.errorMessage)
      }
      getComments()
      setNewCommentBody('')
    })
    .catch((error) => {
      console.log(error)
    })
    
  }

  const deleteComment = (e) => {
    const commentid = e.target.parentElement.getAttribute('commentid')
    fetch(API_URL + commentid, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('user')
      }
    })
    .then(res => res.json())
    .then((data) => {
      if(data.errorMessage){
        throw new Error(data.errorMessage)
      }
      getComments()
    })
    .catch((error) => {
      console.log(error)
    })

  }

  return (
    <div>
      {comments?.map((comment) => (
        <div key={comment._id} commentid={comment._id}>
          <div >{comment.body}</div>
          {(userData?.privilege === 'admin') ? (<button onClick={deleteComment}>delete</button>) : <></>}
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