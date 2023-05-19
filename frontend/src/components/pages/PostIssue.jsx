//react
import { useState, useContext } from "react"
import UserContext from "../../context/UserContext"
import { Link } from "react-router-dom"

//service
import useIssueService from "../../service/useIssueService"

//css
import IssuesCSS from '../assets/styles/Issues.module.css'
import PostMatchCSS from './styles/PostMatch.module.css'
import PostIssueCSS from './styles/PostIssue.module.css'

//loader
import ClipLoader from "react-spinners/ClipLoader"


function PostIssue() {
    const {userData} = useContext(UserContext)
    const {issueLoading, postGeneralIssue} = useIssueService()

    const [formData, setFormData] = useState({
        title: '',
        body: '',
    })
    const {title, body} = formData

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value 
        }))
    }

    const onSubmit = (e) => {   
        e.preventDefault()
        postGeneralIssue(formData)
        .then(() => setFormData({title: '', body: ''}))
    }

  return (
    <div className={PostIssueCSS.parent}>

        <div style={{alignSelf: 'center', fontWeight: '600'}} className={PostIssueCSS.info}>
            Is there an issue or suggestion with Eye of Ophidia that you would like to report? 
            <br />
            Feel free to report to us any missing events, missing matches, or any errors we may have with our data.
            <br />
            Any info and help would be would be greatly appreciated! 
        </div>

        { userData.name ?
             <form onSubmit={onSubmit} className={PostIssueCSS.form} style={{height: '100%'}} id='form1'>
                
                <div className={IssuesCSS.formContainer}>
                    <label className={IssuesCSS.label}>Title</label>
                    <input placeholder='Issue title' name='title' type="text" onChange={onChange} value={title} className={IssuesCSS.input}/>
                </div>

                <div className={IssuesCSS.formContainer}>
                    <label className={IssuesCSS.label}>Body</label>
                    <textarea placeholder='Try to include any details you can!' name='body' id="" value={body} onChange={onChange} className={IssuesCSS.textarea}
                    style={{
                        height: '14em',
                    }}></textarea>
                </div>

                <button type="submit" form="form1" value="Submit" className={PostMatchCSS.submitButton}> 
                    {issueLoading ? <ClipLoader color='white' size={20}/>
                    : <>Submit</>}
                </button>

            </form>
            :
            <p>Please <Link to='/login' style={{fontWeight: 'bold'}}>login/register</Link> to access this form</p>
        }
       
    </div>
  )
}
export default PostIssue