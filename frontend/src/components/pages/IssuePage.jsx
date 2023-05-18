//react
import {useState, useEffect} from 'react'

//assets
import IssuePageComponent from '../assets/IssuePageComponent'
import Order from '../assets/Order'

//service
import useIssueService from '../../service/useIssueService'

//css
import IssuePageCSS from './styles/IssuePage.module.css'
import CommentsCSS from '../assets/styles/Comments.module.css'

//loader
import MoonLoader from 'react-spinners/MoonLoader'

function IssuePage() {
  const {issueLoading, getIssues} = useIssueService()
  const [issues, setIssues] = useState()
  const [tab, setTab] = useState('match')
  const [statusFilter, setStatusFilter] = useState('pending')
  const [order, setOrder] = useState(-1)

  const limit = 10
  const [page, setPage] = useState(0)
  const [count, setCount] = useState('')

  useEffect(() => {
    setIssues()
    getIssues(undefined, tab, statusFilter, page, limit, order)
    .then(data => {
      setIssues(data.issues)
      setCount(data.count)
    })
  }, [tab, statusFilter, page, order])

  return (
    <div className={IssuePageCSS.parent}>
      {/* target type buttons */}
      <div style={{margin: '10px'}} className={IssuePageCSS.buttonContainer}>
        <button onClick={() => setTab('general')} className={`
        ${IssuePageCSS.button}
        ${tab==='general' ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}
        `}>General Issues</button>

        <button onClick={() => setTab('match')} className={`
        ${IssuePageCSS.button}
        ${tab==='match' ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}
        `}>Match Issues</button>

        <button onClick={() => setTab('event')} className={`
        ${IssuePageCSS.button}
        ${tab==='event' ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}
        `}>Event Issues</button>
      </div>

      {/* status buttons */}
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

      <Order order={order} setOrder={setOrder} style={{padding: '10px'}}/>

      {/* <div style={{margin: '10px'}} className={IssuePageCSS.buttonContainer}>
        <button onClick={() => setOrder(1)} style={{fontSize: '.8em', padding: '5px'}} className={`
          ${IssuePageCSS.button}
          ${order===1 ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}
        `}>Newest</button>

        <button onClick={() => setOrder(-1)}  style={{fontSize: '.8em', padding: '5px'}} className={`
          ${IssuePageCSS.button}
          ${order===-1 ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}
        `}>Oldest</button>
      </div> */}

      <MoonLoader size={60} loading={issueLoading} cssOverride={{alignSelf: 'center'}}/> 

      <div className={CommentsCSS.pageButtons}>
        {count && Array.from(Array(Math.floor(count/limit + 1)), (e, i) => <button className={i===page && CommentsCSS.selectedButton} onClick={() => {setPage(i)}}>{i+1}</button>)}
      </div>

      <div className={IssuePageCSS.issuesContainer}>
        {issues?.map((issue) => (<IssuePageComponent issue={issue} key={issue._id}/>))}
        {!issues && <div>No {tab} issues currently</div>}
      </div>

      {issues?.length === 0 && <p className={IssuePageCSS.noIssuesFound}>No issues found</p>}

      <br />
      
    </div>
  )
}

export default IssuePage