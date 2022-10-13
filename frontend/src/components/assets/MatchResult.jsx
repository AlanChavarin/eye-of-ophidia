import './styles/MatchResult.css'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import UserContext from '../../context/UserContext'

function MatchResults({match}) {
  const {userData} = useContext(UserContext)
  return (
    <div className='matchresult-parent'>
      {match ? (
        <>
          <div>Player: {match.player1.name}</div>
          <div>Hero: {match.player1.hero}</div>
          <div>Deck List: {match.player1.deck}</div>
          <div>Player: {match.player2.name}</div>
          <div>Hero: {match.player2.hero}</div>
          <div>Deck List: {match.player2.deck}</div>
          <div>Event: {match.event}</div>
          <div>Description: {match.description}</div>
          <div>Video Link: {match.link}</div>
          <div>Date: {match.date}</div>
          <Link to={'/matches/' + match._id}>Go to match page!</Link>
          {(userData?.privilege === 'admin') ? <Link to={'/postmatch/' + match._id}>Edit this match</Link> : <></>}
        </>
      ): <></>}
      
    </div>
  )
}
export default MatchResults