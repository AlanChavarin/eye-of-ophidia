//react
import { useEffect, useState } from "react"

//service
import useLoginService from "../../service/useLoginService"

//loader
import ClipLoader from "react-spinners/ClipLoader"

//assets
import User from "../assets/User"

//css
import CommentsCSS from '../assets/styles/Comments.module.css'
import UsersCSS from './styles/Users.module.css'
import IssuePageCSS from '../pages/styles/IssuePage.module.css'

function Users() {
    const {loginLoading, getUsers} = useLoginService()
    const [users, setUsers] = useState()
    

    const limit = 60
    const [page, setPage] = useState(0)
    const [count, setCount] = useState('')

    const privileges = ['all', 'admin', 'moderator', 'user', 'banned']
    const [privilegeFilter, setPrivilegeFilter] = useState('all')

    useEffect(() => {
        let filter
        (privilegeFilter === 'all') ? (filter='') : (filter=privilegeFilter)
        getUsers(page, limit, filter)
        .then(data => {
            setUsers(data.users)
            setCount(data.count)
        })
    }, [page, privilegeFilter])

  return (
    <div className={UsersCSS.parent}> 

        <div style={{margin: '10px'}} className={IssuePageCSS.buttonContainer}>
            {privileges.map(privilege => (
                <button onClick={() => setPrivilegeFilter(privilege)} className={`
                    ${IssuePageCSS.button}
                    ${privilegeFilter===privilege ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}
                `}>{privilege}</button>
            ))}
        </div>

        <div className={UsersCSS.container}>
            {loginLoading ? <ClipLoader size={70}/> : users?.map(user => (
                <User user={user} key={user._id}/>
             ))}
        </div>
        <div className={CommentsCSS.pageButtons}>
            {count && Array.from(Array(Math.floor(count/limit + 1)), (e, i) => <button className={i===page && CommentsCSS.selectedButton} onClick={() => setPage(i)}>{i+1}</button>)}
        </div>        
    </div>
  )
}
export default Users