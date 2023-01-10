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
import PostEvent from "./components/pages/PostEvent"
import Verify from "./components/pages/Verify"

//tools
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

//context
import {UserProvider} from './context/UserContext'
import {AlertProvider} from './context/AlertContext'

//auth
import UserAuth from "./auth/UserAuth"

//alert
import Alert from "./components/assets/Alert"

function App() {
  return (
    <UserProvider>
      <AlertProvider>
        <div className="app-parent">
          <Navbar />
          <div className='app-container background-color'>
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
                <Route path='/postevent' element={<PostEvent />}/>
                <Route path='/postevent/:eventid' element={<PostEvent />}/>
              </Route>
            </Routes>
          </div>
          <Footer />
          <Alert />
        </div>
      </AlertProvider>
    </UserProvider>
    
  );
}

export default App;
