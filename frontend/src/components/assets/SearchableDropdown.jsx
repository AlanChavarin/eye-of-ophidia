import SearchableDropdownCSS from './styles/SearchableDropdown.module.css'
import { useState } from 'react'
import LoginCSS from '../pages/styles/Login.module.css'

function SearchableDropdown({items, name, value, onChange, placeholder}) {
    const [dropdown, setDropdown] = useState(false)

    var a = document.getElementsByClassName('dropdownItem')

    const onFilter = (e) => {
      var filter1 = e.target.value.toUpperCase()
      for (var i = 0; i < a.length; i++) {
        var txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter1) > -1) {
          a[i].style.display = "";
        } else {
          a[i].style.display = "none";
        }
      }
    }

    const onFocus = () => {
      setDropdown(true)
    }

    const onBlur = () => {
      setTimeout(() => setDropdown(false), 100)
    }

    const onClick = (e) => {
      e.target.name = e.target.getAttribute('name')
      e.target.value = e.target.getAttribute('value')
      onChange(e)
    }

  return (
    <div className={SearchableDropdownCSS.parent}>
        <input placeholder={placeholder && items[0]} type="text" name={name} onChange={(e) => {onFilter(e); onChange(e)}} value={value} onFocus={onFocus} onBlur={onBlur} className={LoginCSS.input}/>
        <span className={SearchableDropdownCSS.dropdown} style={{visibility: dropdown ? "visible" : "hidden"}}>
          {items?.map((item) => (<div className='dropdownItem' name={name} onClick={onClick} value={item} key={item}>{item}</div>))}
        </span>
    </div>
  )
}

export default SearchableDropdown