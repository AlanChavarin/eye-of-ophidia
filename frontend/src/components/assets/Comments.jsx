import {useState, useEffect} from 'react'

function Comments({matchid}) {
  const API_URL = 'http://localhost:5000/api/comments/'
  const [comments, setComments] = useState()

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

  return (
    <div>
      {comments?.map((comment) => (
        <div key={comment._id}>{comment.body}</div>
      ))}
    </div>
  )
}
export default Comments