//react
import {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

//service
import useIssueService from '../../service/useIssueService'

//assets
import Issue from './Issue'

//css
import IssuesCSS from './styles/Issues.module.css'
import IssuePageCSS from '../pages/styles/IssuePage.module.css'

function Issues({targetid, status, targetType}) {
    const {getIssues, postIssue, getAllIssues} = useIssueService()
    const [issues, setIssues] = useState()
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    })
    const [statusFilter, setStatusFilter] = useState('pending')

    const {title, body} = formData

    useEffect(() => {
        fetchIssues()
    }, [statusFilter])

    const fetchIssues = () => {
        if(targetid){
            getIssues(targetid, statusFilter).then(data => setIssues(data))
        } else {
            getAllIssues(status).then(data => setIssues(data))
        }
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
        .then(() => getIssues(targetid, 'pending'))
        .then(data => {
            setStatusFilter('pending')
            setIssues(data)
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
        {issues?.map((issue) => (
            <Issue issue={issue}/>
        ))}
        {(targetid) && <>
            <br/>
            <hr className={IssuesCSS.hr}/>
            <form onSubmit={onSubmit} className={IssuesCSS.form}>
                <div style={{alignSelf: 'center', fontWeight: '600'}}>Is there an issue with this match/event? Submit an issue down below!</div>
                <div className={IssuesCSS.formContainer}>
                    <label className={IssuesCSS.label}>Title</label>
                    <input placeholder='Issue title' name='title' type="text" onChange={onChange} value={title} className={IssuesCSS.input}/>
                </div>
                <div className={IssuesCSS.formContainer}>
                    <label className={IssuesCSS.label}>Body</label>
                    <textarea placeholder='Write the details of the issue with this match/event' name='body' id="" cols="30" rows="7" value={body} onChange={onChange} className={IssuesCSS.textarea}></textarea>
                </div>
                <input type="submit" value='Submit Issue' className={IssuesCSS.submitButton} style={{boxShadow: '3px 3px 2px black'}}/>
            </form>
            </>}
            
        
    </div>
  )
}

Issues.propTypes = {
    targetid: PropTypes.string.isRequired
}

export default Issues