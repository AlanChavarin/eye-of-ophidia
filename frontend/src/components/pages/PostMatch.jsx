import PostMatchCSS from './styles/PostMatch.module.css'
import {useState, useEffect} from 'react'
import HeroSelect from '../assets/HeroSelect'
import {useParams} from 'react-router-dom'
import {getMatchForForm, postMatch} from '../../service/MatchService'

function PostMatch() {
  const {matchid} = useParams()
  const [formData, setFormData] = useState({
    player1Name: '',
    player1Hero: '',
    player1Deck: '',

    player2Name: '',
    player2Hero: '',
    player2Deck: '',

    event: '',
    link: '',
    date: '',
    description: '',
  })

  const {player1Name, player1Hero, player1Deck, player2Name, player2Hero, player2Deck, event, link, date, description} = formData

  useEffect(() => {
    if(matchid){
      getMatchForForm(matchid)
      .then(data => setFormData(data)) 
    }  
  }, [])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    postMatch(formData, matchid)
  }


  return (
    <form onSubmit={onSubmit} className={PostMatchCSS.form}>
      <h3>{(matchid) ? (<>edit mode</>):(<>post mode</>)}</h3>
      <div className={PostMatchCSS.container}>
        <label>Event Name</label>
        <input type="text" name='event' value={event} onChange={onChange} required/>
      </div>
      <div className={PostMatchCSS.container}>
        <label>Video Link</label>
        <input type="text" name='link' value={link} onChange={onChange} required/>
      </div>
      <div className={PostMatchCSS.container}>
        <label>Date</label>
        <input type="date" name='date' value={date} onChange={onChange} required/>
      </div>

      <div className={PostMatchCSS.container}>
        <label>Player 1 Hero</label>
        <HeroSelect name='player1Hero' value={player1Hero} onChange={onChange} required={true}/>
      </div>
      <div className={PostMatchCSS.container}>
        <label>Player 1 Full Name</label>
        <input type="text" name='player1Name' value={player1Name} onChange={onChange} required/>
      </div>
      <div className={PostMatchCSS.container}>
        <label>Player 1 Deck Link</label>
        <input type="text" name='player1Deck' value={player1Deck} onChange={onChange} required/>
      </div>

      <div className={PostMatchCSS.container}>
        <label>Player 2 Hero</label>
        <HeroSelect name='player2Hero' value={player2Hero} onChange={onChange} required={true}/>
      </div>
      <div className={PostMatchCSS.container}>
        <label>Player 2 Full Name</label>
        <input type="text" name='player2Name' value={player2Name} onChange={onChange} required/>
      </div>
      <div className={PostMatchCSS.container}>
        <label>Player 2 Deck Link</label>
        <input type="text" name='player2Deck' value={player2Deck} onChange={onChange} required/>
      </div>

      <div className={PostMatchCSS.container}>
        <label>Description</label>
        <textarea name="description" cols="30" rows="5" value={description} onChange={onChange}></textarea>
      </div>
      <input type="submit" />

    </form>
  )
}
export default PostMatch