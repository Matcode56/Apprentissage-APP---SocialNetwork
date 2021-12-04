import React from "react";
import {NavLink} from "react-router-dom";
import '../../styles/navbar/_nav.scss';
import Logout from "../auth/logout";
import { UidContext } from "../context/context";

const Nav=() =>{
  return(
      <nav>
          
              <NavLink exact to="/" className="Logo">
                    <i class="fab fa-phoenix-framework logoNav"></i>
                    <p className="textLogo">SocialGrowth</p>
              </NavLink>
              <Logout/>
              
            
      </nav>
  )
}

export default Nav