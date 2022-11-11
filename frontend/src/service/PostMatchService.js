const API_URL = 'http://localhost:5000/api/matches/'

export const postMatch = async (formData, matchid) => {
    const {player1Name, player1Hero, player1Deck, player2Name, player2Hero, player2Deck, event, link, date, description} = formData
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

export const fetchMatch = async (setFormData, matchid) => {
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