import './styles/PostMatch.css'
import {useState, useEffect} from 'react'
import HeroSelect from '../assets/HeroSelect'
import {useParams} from 'react-router-dom'

function PostMatch() {

  const API_URL = 'http://localhost:5000/api/matches/'
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
    fetchMatch()
  }, [])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    fetch(API_URL + matchid, {
      method: matchid ? 'PUT' : 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('user')
      },
      body: JSON.stringify({
        player1: {
          name: player1Name,
          hero: player1Hero,
          deck: player1Deck,
        },
        player2: {
          name: player2Name,
          hero: player2Hero,
          deck: player2Deck,
        },
        event: event,
        link: link,
        date: date,
        description: description,
      })
    })
    .then(res => res.json())
    .then((data) => {
      //console.log(data)
      if(data.errorMessage){
        throw new Error(data.errorMessage)
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const fetchMatch = () => {
    if(matchid){
      fetch(API_URL + matchid)
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        if(data.errorMessage){
          throw new Error(data.errorMessage)
        }
        const {player1, player2, event, link, date, description} = data
        setFormData({
          player1Name: player1.name,
          player1Hero: player1.hero,
          player1Deck: player1.deck,
      
          player2Name: player2.name,
          player2Hero: player2.hero,
          player2Deck: player2.deck,
      
          event: event,
          link: link,
          date: date.slice(0, 10),
          description: description,
        })

      })
      .catch((error) => {
        console.log(error);
      })
    }
  } 


  return (
    <form onSubmit={onSubmit} className='postmatch-form'>
      <h3>{(matchid) ? (<>edit mode</>):(<>post mode</>)}</h3>
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
        <HeroSelect name='player1Hero' value={player1Hero} onChange={onChange} required={true}/>
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
        <HeroSelect name='player2Hero' value={player2Hero} onChange={onChange} required={true}/>
      </div>
      <div className='postmatch-form-container'>
        <label>Player 2 Full Name</label>
        <input type="text" name='player2Name' value={player2Name} onChange={onChange} required/>
      </div>
      <div className='postmatch-form-container'>
        <label>Player 2 Deck Link</label>
        <input type="text" name='player2Deck' value={player2Deck} onChange={onChange} required/>
      </div>

      <div className='postmatch-form-container'>
        <label>Description</label>
        <textarea name="description" cols="30" rows="5" value={description} onChange={onChange}></textarea>
      </div>
      <input type="submit" />

    </form>
  )
}
export default PostMatch