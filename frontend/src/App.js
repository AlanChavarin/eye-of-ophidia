//layout
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Sidebar from './components/layout/Sidebar'

//pages
import Home from "./components/pages/Home"
import SearchResults from "./components/pages/SearchResults"
import Match from "./components/pages/Match"
import Login from "./components/pages/login/Login"
import Logout from "./components/pages/Logout"
import Me from "./components/pages/Me"
import PostMatch from "./components/pages/postMatch/PostMatch"
import PostEvent from "./components/pages/postEvent/PostEvent"
import Verify from "./components/pages/Verify"
import Events from "./components/pages/Events"
import Event from "./components/pages/event/Event"
import IssuePage from './components/pages/IssuePage'
import Users from './components/pages/Users'
import RequestPasswordReset from "./components/pages/RequestPasswordReset"
import PasswordReset from "./components/pages/PasswordReset"
import PostIssue from "./components/pages/PostIssue"

import TestPage from "./components/pages/TestPage"

//tools
import {BrowserRouter as Router, Route, Routes, useSearchParams} from 'react-router-dom'

//context
import {UserProvider} from './context/UserContext'
import {AlertProvider} from './context/AlertContext'

//auth
import UserAuth from "./auth/UserAuth"

//alert
import Alert from "./components/assets/AlertsContainer"

function App() {
  const [searchParams] = useSearchParams()
  let recyclebin = searchParams.get('recyclebin')
  !recyclebin && (recyclebin=false)

  return (
    <AlertProvider>
      <UserProvider>
        <div className="app-parent">
          <Navbar />
          <Sidebar />
          <div className={`app-container ${!recyclebin ? 'background-color' : ''}`} 
          style={recyclebin ? {
            backgroundColor: '#a6acde'
          }: {}}>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/matches/' element={<SearchResults />}/>
              <Route path='/matches/:matchid' element={<Match />}/>
              <Route path='/events' element={<Events />}/>
              <Route path='/events/:eventid' element={<Event />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/logout' element={<Logout />}/>
              <Route path='/verify/:token' element={<Verify />}/>
              <Route path='/requestpasswordreset' element={<RequestPasswordReset />}/>
              <Route path='/passwordreset' element={<PasswordReset />}/>
              <Route path='/postissue' element={<PostIssue />}/>
              <Route path='/testpage' element={<TestPage />}/>
              <Route element={<UserAuth privilege='user'/>}>
                <Route path='/me' element={<Me />}/>
              </Route>
              <Route element={<UserAuth privilege='moderator'/>}>
                <Route path='/issuepage' element={<IssuePage />}/>
                <Route path='/postmatch' element={<PostMatch />}/>
                <Route path='/postmatch/:matchid' element={<PostMatch />}/>
                <Route path='/postevent' element={<PostEvent />}/>
                <Route path='/postevent/:eventid' element={<PostEvent />}/>
                <Route path='/users' element={<Users />}/>
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
