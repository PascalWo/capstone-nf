import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import Navbar from "./components/NavBar";
import RecipePage from "./pages/RecipePage";
import SearchSpoonacularPage from "./pages/SearchSpoonacularPage";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./routing/RequireAuth";
import SpoonacularDetailsPage from "./pages/SpoonacularDetailsPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import ShoppingListPage from "./pages/ShoppingListPage";

function App() {
  return (
      <div className="App">
          <Header/>
          <Navbar/>
          <Routes>
              <Route element={<RequireAuth/>}>
                  <Route path="/" element={<LandingPage/>}/>
                  <Route path='/recipes' element={<RecipePage/>}/>
                  <Route path='/spoona/search/:search' element={<SearchSpoonacularPage/>}/>
                  <Route path='/spoona/search' element={<SearchSpoonacularPage/>}/>
                  <Route path='/spoona/recipe/:id' element={<SpoonacularDetailsPage/>}/>
                  <Route path='/recipe/:id' element={<RecipeDetailsPage/>}/>
                  <Route path='/shoppinglist' element={<ShoppingListPage/>}/>
              </Route>

              <Route path={'/login'} element={<LoginPage/>}/>
          </Routes>
      </div>
  );
}

export default App;
