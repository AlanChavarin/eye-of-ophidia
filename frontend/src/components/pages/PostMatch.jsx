import './styles/PostMatch.css'
import {useState} from 'react'
import HeroSelect from '../assets/HeroSelect'

function PostMatch() {

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
  })

  const {player1Name, player1Hero, player1Deck, player2Name, player2Hero, player2Deck, event, link, date, } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }


  return (
    <form onSubmit={onSubmit} className='postmatch-form'>

      <div className='postmatch-form-container'>
        <label>Event Name</label>
        <input type="text" name='event' value={event} onChange={onChange} required/>
      </div>
      <div className='postmatch-form-container'>
        <label>Video Link</label>
        <input type="text" name='link' value={link} onChange={onChange} required/>
      </div>
      <div className='postmatch-form-container'>
        <label>Date</label>
        <input type="date" name='date' value={date} onChange={onChange} required/>
      </div>

      <div className='postmatch-form-container'>
        <label>Player 1 Hero</label>
        <HeroSelect name='player1Hero' onChange={onChange} required={true}/>
      </div>
      <div className='postmatch-form-container'>
        <label>Player 1 Full Name</label>
        <input type="text" name='player1Name' value={player1Name} onChange={onChange} required/>
      </div>
      <div className='postmatch-form-container'>
        <label>Player 1 Deck Link</label>
        <input type="text" name='player1Deck' value={player1Deck} onChange={onChange} required/>
      </div>

      <div className='postmatch-form-container'>
        <label>Player 2 Hero</label>
        <HeroSelect name='player2Hero' onChange={onChange} required={true}/>
      </div>
      <div className='postmatch-form-container'>
        <label>Player 2 Full Name</label>
        <input type="text" name='player2Name' value={player2Name} onChange={onChange} required/>
      </div>
      <div className='postmatch-form-container'>
        <label>Player 2 Deck Link</label>
        <input type="text" name='player2Deck' value={player2Deck} onChange={onChange} required/>
      </div>
      <input type="submit" />

    </form>
  )
}
export default PostMatch