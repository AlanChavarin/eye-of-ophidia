//layout
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"

//pages
import Home from "./components/pages/Home"
import SearchResults from "./components/pages/SearchResults"

//tools
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app-parent">
        <Navbar />
        <div className='app-container'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/matches/' element={<SearchResults />}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
