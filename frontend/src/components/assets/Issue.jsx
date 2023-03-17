//react
import { useState, useContext, useEffect } from 'react'
import UserContext from '../../context/UserContext'

//service
import useIssueService from '../../service/useIssueService'

//css
import IssuesCSS from './styles/Issues.module.css'
import IssuePageCSS from '../pages/styles/IssuePage.module.css'


function Issue({issue}) {
    const {userData} = useContext(UserContext)

    const [issueData, setIssueData] = useState(issue)

    const {getIssue, changeStatus} = useIssueService()

    const onChangeStatus = (e) => {
        const status = e.target.getAttribute('status')
        changeStatus(issue._id, status)
        .then(() => getIssue(issue._id).then(data => {
            issue.status = status
            setIssueData(data)
        }))
    }

    useEffect(() => {
        setIssueData(issue)
    }, [])

  return (
    <div key={issue._id} className={IssuesCSS.issueContainer}>
        {(issueData) && <>
            <div className={IssuesCSS.issueTitle}>Subject: {issue.title}</div>
            <div style={{padding: '10px'}}>{issue.body}</div>
            <hr className={IssuesCSS.hr}/>
            <div style={{padding: '10px'}}>
                {(issue.status === 'pending') && <div>Current Status:  <b style={{fontWeight: '600', color: '#db3c30'}}>{issue.status}</b></div>}
                {(issue.status === 'fixed') && <div>Current Status:  <b style={{fontWeight: '600', color: '#54e356'}}>{issue.status}</b></div>}
                {(issue.status === 'closed') && <div>Current Status:  <b style={{fontWeight: '600', color: '#5469e3'}}>{issue.status}</b></div>}

                {(userData?.privilege === 'admin') && (<>
                    <div className={IssuesCSS.statusButtons}>
                        <button className={`
                        ${IssuePageCSS.button}
                        ${issue.status==='pending' ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}
                        `} status='pending' onClick={onChangeStatus}>pending</button>
                        <button className={`
                        ${IssuePageCSS.button}
                        ${issue.status==='fixed' ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}
                        `} status='fixed' onClick={onChangeStatus}>fixed</button>
                        <button className={`
                        ${IssuePageCSS.button}
                        ${issue.status==='closed' ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}
                        `} status='closed' onClick={onChangeStatus}>closed</button>
                    </div>
                </>)}
            </div>
            <div style={{fontSize: 'smaller'}}>
                Created at {issue.createdDate.slice(0, 10)}
            </div>
        </>}
    </div>
  )
}
export default Issue