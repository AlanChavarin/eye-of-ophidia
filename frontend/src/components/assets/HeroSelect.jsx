 import {useState, useEffect} from 'react'

function HeroSelect({name, onChange, required, value}) {
    const API_URL = 'http://localhost:5000/api/heroes'

    const [heroData, setHeroData] = useState([])

    useEffect(() => {
        fetchHeroData()
    }, [])

    const fetchHeroData = () => {
        fetch(API_URL)
        .then(res => res.json())
        .then((data) => {
            if(data.errorMessage){
                throw new Error(data.errorMessage)
            }
            let heroNames = []
            data.map((hero) => {
                heroNames.push(hero.name)
            })
            setHeroData(heroNames)
        })
    }
    
  return (
    <div>
        <select name={name} onChange={onChange} required={required} value={value}>
            <option value=''>None</option>
            {heroData.map((hero) => (<option value={hero} key={hero}>{hero}</option>))}
        </select>
    </div>
  )
}
export default HeroSelect