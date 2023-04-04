import {useState, useEffect} from 'react'
import useNameService from '../../service/useNameService'
import SearchableDropdown from './SearchableDropdown'

function NameSelect({name, onChange, value}) {
    const {getNames} = useNameService()
    const [names, setNames] = useState()

    useEffect(() => {
        getNames()
        .then(data => {
          let arr = []
          data.map(d => arr.push(d.name))
          setNames(arr)
        })
    }, [])

  return (
    <SearchableDropdown items={names} name={name} value={value} onChange={onChange}/>
  )
}
export default NameSelect