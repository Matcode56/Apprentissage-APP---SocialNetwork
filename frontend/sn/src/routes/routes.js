import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from '../pages/home';
import Profil from '../pages/profil';
import Trending from '../pages/Trending';
import NotFound from "../pages/NotFound";
import Nav from "../components/navbar/navbar";
import { UidContext } from "../components/context/context";
import BottomNav from "../components/navbar/bottomNav";


const RouterReact=() =>{
  const uid= useContext(UidContext);
  
  return(
    
    <Router>
        <Nav/>
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/profil" exact element={<Profil/>}/>
        <Route path="/Trending" exact element={<Trending/>}/>
        <Route path ="*" element={<NotFound/>} />
      </Routes>

      {uid&& <BottomNav/>}
    
  </Router>

  
  )
}

export default RouterReact