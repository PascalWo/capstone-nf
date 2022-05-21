import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import Navbar from "./components/NavBar";
import RecipePage from "./pages/RecipePage";
import SearchSpoonacularPage from "./pages/SearchSpoonacularPage";


function App() {
  return (
    <div className="App">
        <Header/>
        <Navbar/>
      <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path='/recipes' element={<RecipePage/>} />
          <Route path='/search' element={<SearchSpoonacularPage/>} />
      </Routes>
    </div>
  );
}

export default App;
