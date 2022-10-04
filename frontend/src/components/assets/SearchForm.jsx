import './styles/SearchForm.css'
import {useState} from 'react'
import HeroSelect from './HeroSelect'
import {useNavigate} from 'react-router-dom'

function SearchForm() {

    const API_URL = 'http://localhost:5000/api/matches/'
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
            <form className='searchform-form' onSubmit={onSubmit}>
                <div className='searchform-form-container'> 
                    <label>Search</label>
                    <input type='text' name='text' value={text} onChange={onChange}/>
                </div>
                <div className='searchform-form-container'>   
                    <label>Select hero</label>
                    <HeroSelect name='hero1' onChange={onChange}/>
                </div>
                <div className='searchform-form-container'>
                    <label>Select hero</label>
                    <HeroSelect name='hero2' onChange={onChange}/>
                </div>
                <input type='submit'/>
            </form>
        </div>
    )
}

export default SearchForm