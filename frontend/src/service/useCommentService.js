import {useContext, useState} from 'react'
import AlertContext from '../context/AlertContext'
const API_URL = `${process.env.REACT_APP_API && process.env.NODE_ENV==='development' ? process.env.REACT_APP_API : ''}` + '/api/comments/'

const useCommentService = () => {
  const {addAlert} = useContext(AlertContext)
  const [commentLoading, setLoading] = useState(false)

  const getComments = async (matchid, page, limit) => {
      setLoading(true)
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
              setLoading(false)
              resolve(data)
          })
          .catch(error => err(error))
        ))
      } else {
        throw new Error('matchid doesnt exist')
      }
    }

  const postComment = async (newCommentBody, matchid) => {
      setLoading(true)
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
            setLoading(false)
            resolve(true)
          })
          .catch(error => err(error))
      ))
  }

  const deleteComment = (commentid) => {
      setLoading(true)
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
          setLoading(false)
          resolve(true)
        })
        .catch(error => err(error))
      ))
    }

    const err = (error) => {
      console.error(error.message)
      addAlert(error.message, 'error')
      setLoading(false)
    } 

    return {commentLoading, getComments, postComment, deleteComment}
}

export default useCommentService