import {useEffect, useState, useContext} from 'react'
import PropTypes from 'prop-types'
import UserContext from '../../context/UserContext'
import {getIssues, changeStatus, postIssue} from '../../service/IssueService'
import IssuesCSS from './styles/Issues.module.css'

function Issues({matchid}) {
    const {userData} = useContext(UserContext)
    const [issues, setIssues] = useState()
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    })

    const {title, body} = formData

    useEffect(() => {
        getIssues(matchid).then(data => setIssues(data))
    }, [])

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value 
        }))
    }

    const onChangeStatus = (e) => {
        const issueid = e.target.parentElement.parentElement.parentElement.getAttribute('issueid')
        const status = e.target.getAttribute('status')
        changeStatus(issueid, status)
        .then(() => getIssues(matchid))
        .then(data => setIssues(data))
    }

    const onSubmit = (e) => {   
        e.preventDefault()
        postIssue(matchid, formData)
        .then(() => getIssues(matchid))
        .then(data => setIssues(data))
        .then(() => setFormData({title: '', body: ''}))
    }

  return (
    <div>
        {issues?.map((issue) => (
            <div key={issue._id} issueid={issue._id} className={IssuesCSS.issueContainer}>
                <div className={IssuesCSS.issueTitle}>Subject: {issue.title}</div>
                <div style={{padding: '10px'}}>{issue.body}</div>
                <hr className={IssuesCSS.hr}/>
                <div style={{padding: '10px'}}>
                    {(issue.status === 'pending') && <div>Current Status:  <b style={{fontWeight: '600', color: '#db3c30'}}>{issue.status}</b></div>}
                    {(issue.status === 'fixed') && <div>Current Status:  <b style={{fontWeight: '600', color: '#54e356'}}>{issue.status}</b></div>}
                    {(issue.status === 'closed') && <div>Current Status:  <b style={{fontWeight: '600', color: '#5469e3'}}>{issue.status}</b></div>}

                    {(userData?.privilege === 'admin') ? (
                        <>
                            <div>Change issue status: </div>
                            <div className={IssuesCSS.statusButtons}>
                                <button className={IssuesCSS.submitButton} status='pending' onClick={onChangeStatus}>pending</button>
                                <button className={IssuesCSS.submitButton} status='fixed' onClick={onChangeStatus}>fixed</button>
                                <button className={IssuesCSS.submitButton} status='closed' onClick={onChangeStatus}>closed</button>
                            </div>
                        </>
                    ) : <></>}
                </div>
                
            </div>
        ))}
        <br/>
        <hr className={IssuesCSS.hr}/>
        <form onSubmit={onSubmit} className={IssuesCSS.form}>
            <div style={{alignSelf: 'center', fontWeight: '600'}}>Is there an issue with this match? Submit an issue down below!</div>
            <div className={IssuesCSS.formContainer}>
                <label className={IssuesCSS.label}>Title</label>
                <input placeholder='Issue title' name='title' type="text" onChange={onChange} value={title} className={IssuesCSS.input}/>
            </div>
            <div className={IssuesCSS.formContainer}>
                <label className={IssuesCSS.label}>Body</label>
                <textarea placeholder='Write the details of the issue with this match' name='body' id="" cols="60" rows="7" value={body} onChange={onChange} className={IssuesCSS.textarea}></textarea>
            </div>
            <input type="submit" value='Submit Issue' className={IssuesCSS.submitButton} style={{boxShadow: '3px 3px 2px black'}}/>
        </form>
    </div>
  )
}

Issues.propTypes = {
    matchid: PropTypes.string.isRequired
}

export default Issues