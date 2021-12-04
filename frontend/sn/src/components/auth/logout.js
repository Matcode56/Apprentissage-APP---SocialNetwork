import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import cookie from 'js-cookie'




const Logout=() =>{
    const removeCookie=(keyCookie)=>{
        cookie.remove(keyCookie, {expires: 1})
    }
    const handleLogout= ()=>{
        axios({
            method: 'get',
            url: `http://localhost:5000/api/user/logout`,
            withCredentials: true
        })
        .then(()=>{
            removeCookie('jwt')
        })
        .catch((err)=>{
            console.log(err)
        })

        window.location= "/"
    }
  return(
    <NavLink exact to='/' className="iconLogout" onClick={handleLogout}>
                <i class="fas fa-sign-out-alt"></i>
    </NavLink>
  )
}
 
export default Logout