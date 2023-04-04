//react
import {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import UserContext from '../../context/UserContext'

//assets
import HeroSelect from './HeroSelect'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

//css
import SearchFormCSS from './styles/SearchForm.module.css'
import IssuePageCSS from '../pages/styles/IssuePage.module.css'

function SearchForm({page}) {
    const {userData} = useContext(UserContext)
    const [order, setOrder] = useState(0)

    const navigate = useNavigate()
 
    const [formData, setFormData] = useState({
        text: "",
        hero1: "",
        hero2: "",
        reyclebin: false,
    })
    const {text, hero1, hero2, recyclebin} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onChangeChecked = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        navigate(`/${page}/?text=` + text + 
        `${(page==='matches') ? ('&hero1=' + hero1 + '&hero2=' + hero2) : ''}` + 
        `${recyclebin ? '&recyclebin=true' : ''}` + 
        `${order ? ('&order=' + order) : ''}`)
    }
    return (
        <div className={SearchFormCSS.parent}>
            <form className={SearchFormCSS.searchform} onSubmit={onSubmit}>
                <div className={SearchFormCSS.searchBar}> 
                    <button className={SearchFormCSS.searchButton}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                    <input className={SearchFormCSS.searchInput} type='text' name='text' value={text} onChange={onChange} placeholder={`Search for ${page}`}/>
                </div>
                {(page==='matches') && <div className={SearchFormCSS.hero}>
                    <div className={SearchFormCSS.container}>   
                        <HeroSelect name='hero1' onChange={onChange} value={hero1}/>
                    </div>
                    <label className={SearchFormCSS.vs}>VS</label>
                    <div className={SearchFormCSS.container}>
                        <HeroSelect name='hero2' onChange={onChange} value={hero2}/>
                    </div>
                </div>}

                {page==='events' && <div className={IssuePageCSS.buttonContainer}>
                    <button 
                    onClick={(e) => {e.preventDefault(); setOrder(1)}}
                    className={`${IssuePageCSS.button} ${order===1 ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}`}>Newest</button>
                    <button 
                    onClick={(e) => {e.preventDefault(); setOrder(-1)}}
                    className={`${IssuePageCSS.button} ${order===-1 ? IssuePageCSS.buttonSelected : IssuePageCSS.buttonUnselected}`}>Oldest</button>
                </div>}

                {userData?.privilege==='admin' && <div className={SearchFormCSS.container} style={{flexDirection: 'row'}}>
                    <label>Recyclebin</label>
                    <input type="checkbox" name='recyclebin' onChange={onChangeChecked} value={recyclebin}/>
                </div>}
                
            </form>
        </div>
    )
}

export default SearchForm