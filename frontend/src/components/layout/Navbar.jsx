import {Link} from 'react-router-dom'
import './styles/Navbar.css'

function Navbar() {
  return (
    <div className='navbar-parent'>
      <Link className='navbar-grid-item navbar-title' to='/'>
        <div>Eye of Ophidia</div>
      </Link>
    </div>
  )
}
export default Navbar