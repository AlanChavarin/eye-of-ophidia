//react
import {useState, useEffect, useContext} from 'react'
import UserContext from '../../context/UserContext'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

//assets
import Popup from './Popup'

//service
import useCommentService from '../../service/useCommentService'

//css
import PopupCSS from '../assets/styles/Popup.module.css'
import CommentsCSS from './styles/Comments.module.css'

//loader
import MoonLoader from 'react-spinners/MoonLoader'

function Comments({matchid}) {
  const {commentLoading, getComments, postComment, deleteComment} = useCommentService()
  const [comments, setComments] = useState()
  const [newCommentBody, setNewCommentBody] = useState('')
  const {userData} = useContext(UserContext)
  const [popup, setPopup] = useState(false)
  const [currDelCommentId, setCurrDelCommentId] = useState('')

  const limit = 7
  const [page, setPage] = useState(0)
  const [count, setCount] = useState('')

  useEffect(() => {
    setComments()
    runGetComments()
  }, [page])

  const onChange = (e) => {
    setNewCommentBody(e.target.value)
  }

  const runGetComments = () => {
    getComments(matchid, page, limit)
    .then(data => {
      setComments(data.comments)
      setCount(data.count)
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await postComment(newCommentBody, matchid) 
    runGetComments()
    setNewCommentBody('')
  }

  const onDelete = async () => {
    setPopup(false)
    await deleteComment(currDelCommentId)
    runGetComments()
  }

  const promptDelete = (e, commentid) => {
    setPopup(true)
    setCurrDelCommentId(commentid)
  }

  const cancelDelete = (e) => {
    e.preventDefault()
    setPopup(false)
    setCurrDelCommentId('')
  }

  return (
    <div className={CommentsCSS.parent}>

      {/* pagination buttons*/}
      <div className={CommentsCSS.pageButtons}>
        {count && Array.from(Array(Math.floor(count/limit + 1)), (e, i) => <button className={i===page && CommentsCSS.selectedButton} onClick={() => {setPage(i)}}>{i+1}</button>)}
      </div>

      <MoonLoader size={60} loading={commentLoading} cssOverride={{alignSelf: 'center'}}/> 

      {!count && <p style={{textAlign: 'center'}}>No Comments yet. </p>}

      {/* comments */}
      {comments?.map((comment) => (<>
        <div key={comment._id} className={CommentsCSS.comment}>

          {/* delete button */}
          {(userData?.privilege === 'admin') ? (<button className={CommentsCSS.deleteButton} onClick={(e) => promptDelete(e, comment._id)}><FontAwesomeIcon icon={faTrash} /></button>) : <></>}

          {/* profile pic */}
          <img src={window.location.origin + `/profilePics/${comment.picture}.png`} className={CommentsCSS.img}/>
          
          {/* name and comment container */}
          <div className={CommentsCSS.nameAndCommentContainer}>
            <div className={CommentsCSS.commenter} style={{fontSize: comment?.name.length > 19 && '.7em'}}>{comment.name}</div>
            <p className={CommentsCSS.commentBody}>{comment.body}</p>
          </div>
        </div>
        
      </>))}

      <hr className={CommentsCSS.hr}/>
      
      {/* comment form */}
      {((userData?.name) ? (
        <form onSubmit={onSubmit} className={CommentsCSS.form}>
          <textarea placeholder='Leave a comment on this match!' name="newCommentBody" value={newCommentBody} onChange={onChange} id=""  className={CommentsCSS.textarea}>Comment</textarea>
          <input type='submit' value='Comment' className={CommentsCSS.submitButton}/>
        </form>
      ) : <></>)}

      {/* popup */}
      <Popup trigger={popup}>
        <div>
          <h1>Are you sure you want to <b style={{color: 'red'}}>delete</b> this comment? </h1>
          <div>It cannot be restored</div>
        </div>
        <div className={PopupCSS.popupButtons}>
          <button className={PopupCSS.deleteButton} onClick={() => onDelete()}>Delete</button>
          <button className={PopupCSS.cancelButton} onClick={(e) => cancelDelete(e)}>Cancel</button>
        </div>
      </Popup>

    </div>
  )
}
export default Comments