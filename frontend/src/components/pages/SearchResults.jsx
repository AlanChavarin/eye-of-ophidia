//react
import { useEffect, useState } from 'react'
import {useSearchParams} from 'react-router-dom'

//assets
import MatchThumbnail from '../assets/MatchThumbnail'
import SearchForm from '../assets/SearchForm'
import PageButtons from '../assets/PageButtons'

//service
import useMatchService from '../../service/useMatchService'

//helper
import getQuery from '../../helpers/getQuery'

//css
import SearchResultsCSS from './styles/SearchResults.module.css'

//loader
import MoonLoader from "react-spinners/MoonLoader";

function SearchResults() {
    const {matchLoading, getMatches} = useMatchService()
    const [searchParams] = useSearchParams()
    const [matches, setMatches] = useState()
    const {text, hero1, hero2, startDate, endDate, format, order, page, recyclebin} = getQuery()
    const limit = 50
    const [count, setCount] = useState('')

    useEffect(() => {
      getMatches(text, hero1, hero2, startDate, endDate, format, page, limit, order, recyclebin)
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
        {!matchLoading && matches?.map((match) => (
          <MatchThumbnail key={match._id} match={match} recyclebin={recyclebin}/>
        ))}
        {!count && <p style={{fontWeight: '600'}}>Search query found no matches. </p>}
      </div> 

      <PageButtons count={count} limit={limit}/>
    </div>
  )
}
export default SearchResults