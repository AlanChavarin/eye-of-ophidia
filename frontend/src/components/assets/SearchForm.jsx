//react
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

//assets
import HeroSelect from './HeroSelect'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

//css
import SearchFormCSS from './styles/SearchForm.module.css'

function SearchForm({page}) {

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
        navigate(`/${page}/?text=` + text + `${(page==='matches') ? ('&hero1=' + hero1 + '&hero2=' + hero2) : ''}`)
        //'&hero1=' + hero1 + '&hero2=' + hero2
    }

    return (
        <div>
            <form className={SearchFormCSS.searchform} onSubmit={onSubmit}>
                <div className={SearchFormCSS.searchBar}> 
                    <button className={SearchFormCSS.searchButton}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                    <input className={SearchFormCSS.searchInput} type='text' name='text' value={text} onChange={onChange} placeholder={`Search for ${page}`}/>
                </div>

                {(page==='matches') && <div className={SearchFormCSS.hero}>
                    <div className={SearchFormCSS.container}>   
                        <HeroSelect name='hero1' onChange={onChange} value={hero1}/>
                    </div>
                    <label style={{fontWeight: '500', alignSelf: 'center'}}>VS</label>
                    <div className={SearchFormCSS.container}>
                        <HeroSelect name='hero2' onChange={onChange} value={hero2}/>
                    </div>
                </div>}
                
                
            </form>
        </div>
    )
}

export default SearchForm