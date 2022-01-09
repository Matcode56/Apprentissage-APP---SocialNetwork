import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import NotFound from "../pages/NotFound";
import Nav from "../components/navbar/navbar";
import { UidContext } from "../components/context/context";
import BottomNav from "../components/navbar/bottomNav";
import HomePage from "../pages/home";
import ProfilPage from "../pages/profil";


const RouterReact=() =>{
  const uid= useContext(UidContext);
  
  return(
    
    <Router>
        <Nav/>
      <Routes>
        <Route path="/" exact element={<HomePage/>}/>
        <Route path="/profil" exact element={<ProfilPage/>}/>
        <Route path ="*" element={<NotFound/>} />
      </Routes>

      {uid&& <BottomNav/>}
    
  </Router>

  
  )
}

export default RouterReact