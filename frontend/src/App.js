import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Home from "./components/pages/Home"

function App() {
  return (
    <div className="app-parent">
      <Navbar />
      <div className='app-container'>
        <Home />
      </div>
      <Footer />
    </div>
  );
}

export default App;
