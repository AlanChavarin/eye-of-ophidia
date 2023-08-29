 import {useState, useEffect} from 'react'
 import useHeroService from '../../service/useHeroService'
 import SearchableDropdown from './SearchableDropdown'

function HeroSelect({name, onChange, required, value, type, dataCy}) {
    const {getHeroes, getAdultHeroNames, getYoungHeroNames} = useHeroService()
    const [heroData, setHeroData] = useState([])

    useEffect(() => {
      if(type==='adult'){
      getAdultHeroNames()
      .then(data => setHeroData(data))
      } else if (type==='young'){
        getYoungHeroNames()
        .then(data => setHeroData(data))
      } else {
        getHeroes()
        .then(data => setHeroData(data))
      }
    }, [type])
    
  return (
    <SearchableDropdown items={heroData} name={name} value={value} onChange={onChange} placeholder={true} dataCy={dataCy}/>
  )
}
export default HeroSelect