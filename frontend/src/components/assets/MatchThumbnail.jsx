import MatchResultCSS from './styles/MatchResult.module.css'
import {Link} from 'react-router-dom'
import {useContext, useEffect} from 'react'
import UserContext from '../../context/UserContext'

function MatchResults({match}) {
  const {userData} = useContext(UserContext)
  return (
    <div className={MatchResultCSS.match}>
      {match ? (
        <>
          <h1>{match.event.name}</h1>
          <div>{match.player1name}</div>
          <div>{match.player1hero}</div>
          vs
          <div>{match.player2name}</div>
          <div>{match.player2hero}</div>
          -----
          <div>{match.event.startDate.substr(0, 10)}</div>
          {/* <Link to={'/matches/' + match._id}>Go to match page!</Link>
          {(userData?.privilege === 'admin') ? <Link to={'/postmatch/' + match._id}>Edit this match</Link> : <></>} */}
        </>
      ): <></>}
      
    </div>
  )
}
export default MatchResults