const API_URL = 'http://localhost:5000/api/comments/'

export const getComments = async (setComments, matchid) => {
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

export const postComment = async (newCommentBody, getComments, setComments, setNewCommentBody, matchid) => {
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
        getComments(setComments, matchid)
        setNewCommentBody('')
      })
      .catch((error) => {
        console.log(error)
      })
}

export const deleteComment = (e, getComments, setComments, matchid) => {
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
      getComments(setComments, matchid)
    })
    .catch((error) => {
      console.log(error)
    })

  }