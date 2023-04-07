 import {useState, useEffect} from 'react'
 import useHeroService from '../../service/useHeroService'
 import SearchableDropdown from './SearchableDropdown'

function HeroSelect({name, onChange, required, value, type}) {
    const {getHeroes, getAdultHeroNames, getYoungHeroNames} = useHeroService()
    const [heroData, setHeroData] = useState([])

    useEffect(() => {
      console.log(type)
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
    <SearchableDropdown items={heroData} name={name} value={value} onChange={onChange} placeholder={true}/>
  )
}
export default HeroSelect

// <div>
//     <select name={name} onChange={onChange} required={required} value={value} className={HeroSelectCSS.select}>
//       <option value=''>None</option>
//       {heroData.map((hero) => (<option value={hero} key={hero}>{hero}</option>))}
//     </select>
// </div>