import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/navbar/_bottomNav.scss"

const BottomNav=() =>{
  return(
      <div className="bottomNav">
        <div className="iconBottomNav">
            <NavLink to='/' exact>
                <i class="fas fa-home"></i>
            </NavLink>
            <NavLink to='/trending' exact>
                <i class="fas fa-user-alt"></i>
            </NavLink>
            <NavLink to='/profil' exact>
                <i class="fas fa-rocket"></i>
            </NavLink>
        </div>
      </div>
  )
}

export default BottomNav