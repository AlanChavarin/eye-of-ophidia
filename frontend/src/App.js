//layout
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"

//pages
import Home from "./components/pages/Home"
import SearchResults from "./components/pages/SearchResults"
import Match from "./components/pages/Match"
import Login from "./components/pages/Login"
import Logout from "./components/pages/Logout"
import Me from "./components/pages/Me"
import PostMatch from "./components/pages/PostMatch"
import Verify from "./components/pages/Verify"

//tools
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

//context
import {UserProvider} from './context/UserContext'
import UserAuth from "./auth/UserAuth"




function App() {

  return (
    <UserProvider>
        <div className="app-parent">
          <Navbar />
          <div className='app-container'>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/matches/' element={<SearchResults />}/>
              <Route path='/matches/:matchid' element={<Match />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/logout' element={<Logout />}/>
              <Route path='/verify/:token' element={<Verify />}/>
              <Route element={<UserAuth privilege='user'/>}>
                <Route path='/me' element={<Me />}/>
              </Route>
              <Route element={<UserAuth privilege='admin'/>}>
                <Route path='/postmatch' element={<PostMatch />}/>
                <Route path='/postmatch/:matchid' element={<PostMatch />}/>
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
    </UserProvider>
    
  );
}

export default App;
