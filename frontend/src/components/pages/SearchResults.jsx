import { useEffect, useState } from 'react'
import {useSearchParams} from 'react-router-dom'

function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams([])
    const [matches, setMatches] = useState()
    const API_URL = 'http://localhost:5000/api/matches/'
    const text = searchParams.get('text')
    const hero1 =  searchParams.get('hero1')
    const hero2 =  searchParams.get('hero2')

    useEffect(() => {
        getMatches()
        setTimeout(() => {
            console.log(matches, 'this is from useEffect')
        }, 5000)
    }, [])


    const getMatches = () => {
        fetch(API_URL + '?text=' + text + '&hero1=' + hero1 + '&hero2=' + hero2)
        .then(res => res.json())
        .then((data) => {
            let arr = []
            data.map((match) => {
                arr.push(match)
            })
            console.log(arr);
            setMatches(arr)
        })
    }

  return (
    <div className='searchresults-parent'>
        <div>

        </div>
        {/* <div>
            text: {text}
        </div>
        <div>
            hero1: {hero1}
        </div>
        <div>
            hero2: {hero2}
        </div> */}
    </div>
  )
}
export default SearchResults