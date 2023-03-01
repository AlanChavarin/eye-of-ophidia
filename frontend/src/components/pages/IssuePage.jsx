//react
import {useState, useEffect} from 'react'

//assets
import IssuePageComponent from '../assets/IssuePageComponent'

//service
import useIssueService from '../../service/useIssueService'

//css
import IssuePageCSS from './styles/IssuePage.module.css'

function IssuePage() {
  const {getAllIssues} = useIssueService()
  const [issues, setIssues] = useState()
  const [tab, setTab] = useState('match')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    getAllIssues(tab, statusFilter)
    .then(data => {setIssues(data)})
  }, [tab, statusFilter])

  return (
    <div className={IssuePageCSS.parent}>
      <div style={{margin: '10px'}} className={IssuePageCSS.buttonContainer}>
        <button onClick={() => setTab('match')} className={`
        ${IssuePageCSS.button}
        ${tab==='match' ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}
        `}>Match Issues</button>

        <button onClick={() => setTab('event')} className={`
        ${IssuePageCSS.button}
        ${tab==='event' ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}
        `}>Event Issues</button>
      </div>
      <div style={{margin: '10px'}} className={IssuePageCSS.buttonContainer}>
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
      <div className={IssuePageCSS.issuesContainer}>
        {issues?.map((issue) => (<IssuePageComponent issue={issue} key={issue._id}/>))}
        {!issues && <div>No {tab} issues currently</div>}
      </div>
      
    </div>
  )
}

export default IssuePage