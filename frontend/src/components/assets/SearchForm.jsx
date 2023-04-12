//react
import {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import UserContext from '../../context/UserContext'

//assets
import HeroSelect from './HeroSelect'
import Order from './Order'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSliders} from '@fortawesome/free-solid-svg-icons'

//css
import SearchFormCSS from './styles/SearchForm.module.css'

function SearchForm({page}) {
    const {userData} = useContext(UserContext)
    const navigate = useNavigate()
 
    const [formData, setFormData] = useState({
        text: "",
        hero1: "",
        hero2: "",
        startDate: "",
        endDate: "",
        order: 0,
        reyclebin: false,
    })
    const {text, hero1, hero2, startDate, endDate, order, recyclebin} = formData

    const [parameters, setParameters] = useState(false)

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

    const changeOrder = (order) => {
        setFormData((prevState) => ({
            ...prevState,
            order: order
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let navigationUrl = `/${page}/?`
        for(const field in formData){
            if(formData[field]){
                navigationUrl += `&${field}=${formData[field]}`
            }
        }
        navigate(navigationUrl)
    }

    const onSliderClick = (e) => {
        e.preventDefault()
        setParameters(!parameters)

    }


    return (
        <div className={SearchFormCSS.parent}>
            <form className={SearchFormCSS.searchform} onSubmit={onSubmit}>
                {/* Search bar */}
                <div className={SearchFormCSS.searchBar}> 
                    <button className={SearchFormCSS.searchButton}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                    <input className={SearchFormCSS.searchInput} type='text' name='text' value={text} onChange={onChange} placeholder={`Search for ${page}`}/>
                    <button 
                    className={SearchFormCSS.sliderButton} 
                    onClick={(e) => onSliderClick(e)}
                    style={{backgroundColor: parameters && 'lightgray'}}
                    ><FontAwesomeIcon icon={faSliders}/></button>
                </div>

                {/* parameters container */}
                <div className={SearchFormCSS.parametersContainer}>
                    {parameters && <>
                        {(page==='matches') && <div className={SearchFormCSS.hero}>
                            <label style={{fontWeight: '500'}}>Hero Matchup: </label>
                            <div className={SearchFormCSS.container}>   
                                <HeroSelect name='hero1' onChange={onChange} value={hero1}/>
                            </div>
                            <label className={SearchFormCSS.vs}>VS</label>
                            <div className={SearchFormCSS.container}>
                                <HeroSelect name='hero2' onChange={onChange} value={hero2}/>
                            </div>
                        </div>}

                        <div className={SearchFormCSS.hero}>
                            <label style={{fontWeight: '500'}}>Date Range: </label>
                            <input type="date" name='startDate' value={startDate} onChange={onChange} className={SearchFormCSS.dateRange}/>
                            <label className={SearchFormCSS.vs}> - </label>
                            <input type="date" name='endDate' value={endDate} onChange={onChange} className={SearchFormCSS.dateRange}/>
                        </div>
                        
                        <div style={{fontWeight: '500'}}>
                            Sort by: <Order order={order} setOrder={changeOrder}/>
                        </div>
                        

                        {userData?.privilege==='admin' && <div className={SearchFormCSS.container} style={{flexDirection: 'row'}}>
                            <label style={{fontSize: '.6em'}}>Recyclebin</label>
                            <input type="checkbox" name='recyclebin' onChange={onChangeChecked} value={recyclebin}/>
                        </div>}
                    </>}
                </div>
            </form>
        </div>
    )
}

export default SearchForm