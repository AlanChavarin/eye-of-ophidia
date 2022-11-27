import { useEffect, useState } from 'react'
import {useSearchParams} from 'react-router-dom'
import MatchResult from '../assets/MatchResult'
import SearchForm from '../assets/SearchForm'
import {getMatches} from '../../service/MatchService'

function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [matches, setMatches] = useState()
    const text = searchParams.get('text')
    const hero1 =  searchParams.get('hero1')
    const hero2 =  searchParams.get('hero2')

    useEffect(() => {
        getMatches(text, hero1, hero2)
        .then(data => setMatches(data))
    }, [searchParams])

  return (
    <div>
        <SearchForm />
        <div>
          {matches?.map((match) => (
            <MatchResult key={match._id} match={match}/>
            ))}  
        </div>
        
    </div>
  )
}
export default SearchResults