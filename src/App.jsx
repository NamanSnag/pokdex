import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar"
import { Home, SearchPage } from "./pages";

function App() {

  return (
    <div className="App">
    <Router>
    <Navbar/>
    <div style={{height:"60px"}}></div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <SearchPage/>
          }
        />
      </Routes>
    </Router>
  </div>
  )
}

export default App
