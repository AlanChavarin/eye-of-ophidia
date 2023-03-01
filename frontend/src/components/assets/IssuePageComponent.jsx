//react
import { useEffect, useState } from 'react'

//assets
import MatchThumbnail from '../assets/MatchThumbnail'
import EventThumbnail from '../assets/EventThumbnail'
import Issue from '../assets/Issue'

//service
import useMatchService from '../../service/useMatchService'
import useEventService from '../../service/useEventService'

//css
import IssuePageComponentCSS from './styles/IssuePageComponent.module.css'

function IssuePageComponent({issue}) {
    const {getMatch} = useMatchService()
    const {getEvent} = useEventService()
    const [data, setData] = useState()

    useEffect(() => {
        if(issue.targetType==='match'){
            getMatch(issue.target)
            .then(data => setData(data))
        } else if (issue.targetType==='event'){
            getEvent(issue.target)
            .then(data => setData(data))
        }
    }, [])

  return (
    <div className={IssuePageComponentCSS.parent}>
       {data && <>
        {(issue.targetType==='match') && <MatchThumbnail match={data} page='issue'/>}
        {(issue.targetType==='event') && <EventThumbnail event={data} type={'eventPage'}/>}
        <Issue issue={issue}/>
       </>} 
        
    </div>
  )
}
export default IssuePageComponent