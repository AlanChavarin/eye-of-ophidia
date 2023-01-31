import SearchFormCSS from './styles/SearchForm.module.css'
import {useState} from 'react'
import HeroSelect from './HeroSelect'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearchForm() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        text: "",
        hero1: "",
        hero2: ""
    })
    const {text, hero1, hero2} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        navigate('/matches/?text=' + text + '&hero1=' + hero1 + '&hero2=' + hero2)
    }

    return (
        <div>
            <form className={SearchFormCSS.searchform} onSubmit={onSubmit}>
                <div className={SearchFormCSS.searchBar}> 
                    <button className={SearchFormCSS.searchButton}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                    <input className={SearchFormCSS.searchInput} type='text' name='text' value={text} onChange={onChange} placeholder="Search for a match"/>
                </div>
                
                <div className={SearchFormCSS.hero}>
                    <label>Hero matchup</label>
                    <div className={SearchFormCSS.container}>   
                        <HeroSelect name='hero1' onChange={onChange} value={hero1}/>
                    </div>
                    <div className={SearchFormCSS.container}>
                        <HeroSelect name='hero2' onChange={onChange} value={hero2}/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchForm