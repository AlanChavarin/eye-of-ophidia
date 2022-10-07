//layout
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"

//pages
import Home from "./components/pages/Home"
import SearchResults from "./components/pages/SearchResults"
import Match from "./components/pages/Match"
import Login from "./components/pages/Login"
import Logout from "./components/pages/Logout"

//tools
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

//context
import {UserProvider} from './context/UserContext'

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app-parent">
          <Navbar />
          <div className='app-container'>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/matches/' element={<SearchResults />}/>
              <Route path='/matches/:matchid' element={<Match />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/logout' element={<Logout />}/>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UserProvider>
    
  );
}

export default App;
