import {useContext} from 'react'
import AlertContext from '../context/AlertContext'

const useCommentService = () => {
  const API_URL = 'http://localhost:5000/api/comments/'
  const {addAlert} = useContext(AlertContext)

  const getComments = async (matchid, page, limit) => {
        !page && (page=0)
        !limit && (limit=10)
        if(matchid){
          return new Promise( resolve => (
            fetch(API_URL + matchid + '?page=' + page + '&limit=' + limit)
            .then(res => res.json())
            .then((data) => {
                if(data.errorMessage){
                  throw new Error(data.errorMessage)
                }
                resolve(data)
            })
            .catch(error => {
              console.error(error)
              addAlert(error.message, 'error')
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
            addAlert('Comment successfully posted', 'success')
            resolve(true)
          })
          .catch(error => {
            console.error(error)
            addAlert(error.message, 'error')
          })
      ))
  }

  const deleteComment = (commentid) => {
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
          addAlert('Comment successfully deleted', 'success')
          resolve(true)
        })
        .catch(error => {
          console.error(error)
          addAlert(error.message, 'error')
        })
      ))
    }

    return {getComments, postComment, deleteComment}
}

export default useCommentService