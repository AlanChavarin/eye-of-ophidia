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
import Events from "./components/pages/Events"
import Event from "./components/pages/Event"
import IssuePage from './components/pages/IssuePage'

//tools
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

//context
import {UserProvider} from './context/UserContext'
import {AlertProvider} from './context/AlertContext'

//auth
import UserAuth from "./auth/UserAuth"

//alert
import Alert from "./components/assets/AlertsContainer"

function App() {
  return (
    <AlertProvider>
      <UserProvider>
        <div className="app-parent">
          <Navbar />
          <div className='app-container background-color'>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/matches/' element={<SearchResults />}/>
              <Route path='/matches/:matchid' element={<Match />}/>
              <Route path='/events' element={<Events />}/>
              <Route path='/events/:eventid' element={<Event />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/logout' element={<Logout />}/>
              <Route path='/verify/:token' element={<Verify />}/>
              <Route path='/issuepage' element={<IssuePage />}/>
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
      </UserProvider>
    </AlertProvider>
    
  );
}

export default App;
