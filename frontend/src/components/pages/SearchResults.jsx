import { useEffect, useState } from 'react'
import {useSearchParams} from 'react-router-dom'
import MatchResult from '../assets/MatchResult'
import SearchForm from '../assets/SearchForm'

function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [matches, setMatches] = useState()
    const API_URL = 'http://localhost:5000/api/matches/'
    const text = searchParams.get('text')
    const hero1 =  searchParams.get('hero1')
    const hero2 =  searchParams.get('hero2')

    useEffect(() => {
        getMatches()
    }, [searchParams])

    useEffect(() => {
        console.log(matches, 'this is from state')
    }, [matches])


    const getMatches = () => {
        fetch(API_URL + '?text=' + text + '&hero1=' + hero1 + '&hero2=' + hero2)
        .then(res => res.json())
        .then((data) => {
            console.log(data, 'this is from fetch()')
            setMatches(data)
        })
    }

  return (
    <div className='searchresults-parent'>
        <div>
            <SearchForm />
        </div>
        
        <div className='searchresults-matchescontainer'>
          {matches?.map((match) => (
            <MatchResult key={match._id} match={match}/>
            ))}  
        </div>
        
    </div>
  )
}
export default SearchResults