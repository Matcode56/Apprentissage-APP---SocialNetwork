import React, { useContext } from "react";
import {NavLink} from "react-router-dom";
import '../../styles/navbar/_nav.scss';
import Logout from "../auth/logout";
import { UidContext } from "../context/context";

const Nav=() =>{
  const uid= useContext(UidContext);


  return(
      <nav>
          
              <NavLink exact to="/" className="Logo">
                    <i class="fab fa-phoenix-framework logoNav"></i>
                    <p className="textLogo">SocialGrowth</p>
              </NavLink>

              {uid&& <Logout/>}
              
              
            
      </nav>
  )
}

export default Nav