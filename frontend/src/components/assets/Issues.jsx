//react
import {useEffect, useState, useContext} from 'react'
import PropTypes from 'prop-types'

//service
import useIssueService from '../../service/useIssueService'

//assets
import Issue from './Issue'

//css
import IssuesCSS from './styles/Issues.module.css'
import IssuePageCSS from '../pages/styles/IssuePage.module.css'
import CommentsCSS from '../assets/styles/Comments.module.css'

//loader
import MoonLoader from 'react-spinners/MoonLoader'

//context
import UserContext from '../../context/UserContext'

function Issues({targetid, targetType}) {
    const {userData} = useContext(UserContext)
    const {issueLoading, getIssues, postIssue} = useIssueService()
    const [issues, setIssues] = useState()
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    })
    const [statusFilter, setStatusFilter] = useState('pending')

    const limit = 7
    const [page, setPage] = useState(0)
    const [count, setCount] = useState('')

    const {title, body} = formData

    useEffect(() => {
        fetchIssues()
    }, [statusFilter, page])

    const fetchIssues = () => {
        setIssues()
        getIssues(targetid, targetType, statusFilter, page, limit)
        .then(data => {
            setIssues(data.issues)
            setCount(data.count)
        })
    }

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value 
        }))
    }

    const onSubmit = (e) => {   
        e.preventDefault()
        postIssue(targetid, formData, targetType)
        .then(() => {
            statusFilter!=='pending' ?
            setStatusFilter('pending') : 
            fetchIssues()
        })
        .then(() => setFormData({title: '', body: ''}))
    }

  return (
    <div className={IssuesCSS.parent}>

        <div className={IssuePageCSS.buttonContainer}>
            <button onClick={() => setStatusFilter('')} className={`
                ${IssuePageCSS.button}
                ${statusFilter==='' ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}
            `}>All</button>

            <button onClick={() => setStatusFilter('pending')} className={`
                ${IssuePageCSS.button}
                ${statusFilter==='pending' ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}
            `}>Pending</button>

            <button onClick={() => setStatusFilter('fixed')} className={`
                ${IssuePageCSS.button}
                ${statusFilter==='fixed' ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}
            `}>Fixed</button>

            <button onClick={() => setStatusFilter('closed')} className={`
                ${IssuePageCSS.button}
                ${statusFilter==='closed' ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}
            `}>Closed</button>
        </div>

        <div className={CommentsCSS.pageButtons}>
            {count && Array.from(Array(Math.floor(count/limit + 1)), (e, i) => <button className={i===page && CommentsCSS.selectedButton} onClick={() => {setPage(i)}}>{i+1}</button>)}
        </div>

        <MoonLoader size={60} loading={issueLoading} cssOverride={{alignSelf: 'center'}}/> 
        {!count && <p style={{textAlign: 'center'}}>No Issues yet. </p>}

        {issues?.map((issue) => (
            <Issue issue={issue}/>
        ))}

        {(targetid) && <>
            <br/>
            <hr className={IssuesCSS.hr}/>
            <form onSubmit={onSubmit} className={IssuesCSS.form}>
                <div style={{alignSelf: 'center', fontWeight: '600'}}>
                    Is there an issue with this match/event? {`${userData.name ? 'Submit an issue down below!' : 'Please login/register to submit the issue with us and get it fixed as soon as possible!'}`}
                </div>
                {userData.name && <>
                    <div className={IssuesCSS.formContainer}>
                        <label className={IssuesCSS.label}>Title</label>
                        <input placeholder='Issue title' name='title' type="text" onChange={onChange} value={title} className={IssuesCSS.input}/>
                    </div>

                    <div className={IssuesCSS.formContainer}>
                        <label className={IssuesCSS.label}>Body</label>
                        <textarea placeholder='Write the details of the issue with this match/event' name='body' id="" value={body} onChange={onChange} className={IssuesCSS.textarea}></textarea>
                    </div>
                <input type="submit" value='Submit Issue' className={IssuesCSS.submitButton} style={{boxShadow: '3px 3px 2px black'}}/>
                </>}

            </form>
        </>}
            
        
    </div>
  )
}

Issues.propTypes = {
    targetid: PropTypes.string.isRequired
}

export default Issues