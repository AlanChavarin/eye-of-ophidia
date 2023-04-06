//react
import { useEffect, useState } from 'react'
import {useSearchParams} from 'react-router-dom'

//assets
import MatchThumbnail from '../assets/MatchThumbnail'
import SearchForm from '../assets/SearchForm'

//service
import useMatchService from '../../service/useMatchService'

//css
import CommentsCSS from '../assets/styles/Comments.module.css'
import SearchResultsCSS from './styles/SearchResults.module.css'

//loader
import MoonLoader from "react-spinners/MoonLoader";

function SearchResults() {
    const {matchLoading, getMatches} = useMatchService()
    const [searchParams] = useSearchParams()
    const [matches, setMatches] = useState()
    const text = searchParams.get('text')
    const hero1 =  searchParams.get('hero1')
    const hero2 =  searchParams.get('hero2')
    const startDate =  searchParams.get('startDate')
    const endDate =  searchParams.get('endDate')
    let recyclebin =  searchParams.get('recyclebin')
    !recyclebin && (recyclebin=false)

    const limit = 30
    const [page, setPage] = useState(0)
    const [count, setCount] = useState('')

    useEffect(() => {
      getMatches(text, hero1, hero2, startDate, endDate, page, limit, recyclebin)
      .then(data => {
        setMatches(data.matches)
        setCount(data.count)
      })
    }, [searchParams, page])

  return (
    <div className={SearchResultsCSS.parent}>
      <SearchForm page='matches'/>

      <div className={SearchResultsCSS.matchThumbnails} style={{marginTop: '20px'}}>
        <MoonLoader size={70} loading={matchLoading}/>
        {matches?.map((match) => (
          <MatchThumbnail key={match._id} match={match} recyclebin={recyclebin}/>
        ))}
      </div> 

      <div className={CommentsCSS.pageButtons}>
        {count && Array.from(Array(Math.floor(count/limit + 1)), (e, i) => <button className={i===page && CommentsCSS.selectedButton} onClick={() => setPage(i)}>{i+1}</button>)}
      </div>
    </div>
  )
}
export default SearchResults