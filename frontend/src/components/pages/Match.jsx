import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import MatchResult from '../assets/MatchResult'


function Match() {
    const API_URL = 'http://localhost:5000/api/matches/'
    const {matchid} = useParams()
    const [match, setMatch] = useState()

    useEffect(() => {
        getMatch()
    }, [])

    useEffect(() => {
        console.log(match, 'this is from state')
    }, [match])


    const getMatch = () => {
        fetch(API_URL + matchid)
        .then(res => res.json())
        .then((data) => {
            setMatch(data)
        })
    }


  return (
    <div>
        <MatchResult match={match} />
    </div>
  )
}
export default Match