import {useEffect, useState, useContext} from 'react'
import PropTypes from 'prop-types'
import UserContext from '../../context/UserContext'
import {getIssues, changeStatus, postIssue} from '../../service/IssueService'

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
        const issueid = e.target.parentElement.parentElement.getAttribute('issueid')
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
            <div key={issue._id} issueid={issue._id}>
                <div>{issue.title}</div>
                <div>{issue.body}</div>
                <div>{issue.status}</div>
                {(userData?.privilege === 'admin') ? (
                    <div>
                        <button status='pending' onClick={onChangeStatus}>Status: pending</button>
                        <button status='fixed' onClick={onChangeStatus}>Status: fixed</button>
                        <button status='closed' onClick={onChangeStatus}>Status: closed</button>
                    </div>
                ) : <></>}
            </div>
        ))}
        <form onSubmit={onSubmit}>
            <div>
                <label>Title</label>
                <input name='title' type="text" onChange={onChange} value={title}/>
            </div>
            <div>
                <label>Body</label>
                <textarea name='body' id="" cols="60" rows="7" value={body} onChange={onChange}></textarea>
            </div>
            <input type="submit" />
        </form>
    </div>
  )
}

Issues.propTypes = {
    matchid: PropTypes.string.isRequired
}

export default Issues