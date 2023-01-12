 import {useState, useEffect} from 'react'
 import HeroSelectCSS from './styles/HeroSelect.module.css'
 import useHeroService from '../../service/useHeroService'

function HeroSelect({name, onChange, required, value}) {
    const {getHeroes} = useHeroService()
    const [heroData, setHeroData] = useState([])

    useEffect(() => {
        getHeroes()
        .then(data => setHeroData(data))
    }, [])
    
  return (
    <div>
        <select name={name} onChange={onChange} required={required} value={value} className={HeroSelectCSS.select}>
            <option value=''>None</option>
            {heroData.map((hero) => (<option value={hero} key={hero}>{hero}</option>))}
        </select>
    </div>
  )
}
export default HeroSelect