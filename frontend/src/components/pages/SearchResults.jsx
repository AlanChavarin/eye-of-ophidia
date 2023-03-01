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

function SearchResults() {
    const {getMatches, getCount} = useMatchService()
    const [searchParams, setSearchParams] = useSearchParams()
    const [matches, setMatches] = useState()
    const text = searchParams.get('text')
    const hero1 =  searchParams.get('hero1')
    const hero2 =  searchParams.get('hero2')

    const limit = 30
    const [page, setPage] = useState(0)
    const [count, setCount] = useState('')

    useEffect(() => {
      getMatches(text, hero1, hero2, page, limit)
      .then(data => setMatches(data))
      getCount(text, hero1, hero2)
      .then(data => setCount(data))
    }, [searchParams])

    useEffect(() => {
      getMatches(text, hero1, hero2, page, limit)
      .then(data => setMatches(data))
    }, [page])

  return (
    <div>
      <SearchForm/>
      
      <div className={SearchResultsCSS.matchThumbnails}>
        {matches?.map((match) => (
          <MatchThumbnail key={match._id} match={match}/>
        ))}  
      </div> 

      <div className={CommentsCSS.pageButtons}>
        {count && Array.from(Array(Math.floor(count/limit + 1)), (e, i) => <button className={i===page && CommentsCSS.selectedButton} onClick={() => setPage(i)}>{i+1}</button>)}
      </div>
    </div>
  )
}
export default SearchResults