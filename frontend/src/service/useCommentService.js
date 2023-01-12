import {useContext} from 'react'
import AlertContext from '../context/AlertContext'

const useCommentService = () => {
  const API_URL = 'http://localhost:5000/api/comments/'
  const {addAlert} = useContext(AlertContext)

  const getComments = async (matchid) => {
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

  const postComment = async (newCommentBody, matchid) => {
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

  const deleteComment = (e) => {
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

    return {getComments, postComment, deleteComment}
}

export default useCommentService