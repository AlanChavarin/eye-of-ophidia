import { useEffect, useState } from 'react'
import {useSearchParams} from 'react-router-dom'
import MatchThumbnail from '../assets/MatchThumbnail'
import SearchForm from '../assets/SearchForm'
import SearchResultsCSS from './styles/SearchResults.module.css'
import useMatchService from '../../service/useMatchService'

function SearchResults() {
    const {getMatches} = useMatchService()
    const [searchParams, setSearchParams] = useSearchParams()
    const [matches, setMatches] = useState()
    const text = searchParams.get('text')
    const hero1 =  searchParams.get('hero1')
    const hero2 =  searchParams.get('hero2')

    useEffect(() => {
      getMatches(text, hero1, hero2)
      .then(data => {
        setMatches(data)
      })
    }, [searchParams])

  return (
    <div>
      <SearchForm />
      <div className={SearchResultsCSS.matchThumbnails}>
        {matches?.map((match) => (
          <MatchThumbnail key={match._id} match={match}/>
        ))}  
      </div> 
    </div>
  )
}
export default SearchResults