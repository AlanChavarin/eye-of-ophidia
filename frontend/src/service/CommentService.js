const API_URL = 'http://localhost:5000/api/comments/'

export const getComments = async (matchid) => {
      if(matchid){
        return new Promise( resolve => (
          fetch(API_URL + matchid)
          .then(res => res.json())
          .then((data) => {
              if(data.errorMessage){
                  throw new Error(data.errorMessage)
              }
              resolve(data)
          })
        ))
      } else {
        throw new Error('matchid doesnt exist')
      }
  }

export const postComment = async (newCommentBody, matchid) => {
    return new Promise( resolve  => (
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
          resolve(true)
        })
        .catch((error) => {
          console.log(error)
        })
    ))
}

export const deleteComment = (e) => {
    const commentid = e.target.parentElement.getAttribute('commentid')
    return new Promise(resolve => (
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
        resolve(true)
      })
      .catch((error) => {
        console.log(error)
      })
    ))
  }