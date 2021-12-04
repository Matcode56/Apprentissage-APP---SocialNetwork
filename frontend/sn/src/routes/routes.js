import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from '../pages/home';
import Profil from '../pages/profil';
import Trending from '../pages/Trending';
import NotFound from "../pages/NotFound";
import Nav from "../components/navbar/navbar";


const RouterReact=() =>{
  return(
    
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/profil" exact element={<Profil/>}/>
        <Route path="/Trending" exact element={<Trending/>}/>
        <Route path ="*" element={<NotFound/>} />
      
      </Routes>
    
  </Router>

  
  )
}

export default RouterReact