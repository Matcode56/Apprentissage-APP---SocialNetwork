import React, { useEffect, useState } from "react";
import '../../styles/login/_login.scss'
import Login from "./login";
import Register from "./register";

const Auth=() =>{
    const [register, setRegister]= useState(false)

    useEffect(()=>{
        if(!register){
            document.querySelector("#btnRegister").style.opacity= 0.5;
            document.querySelector('#btnLogin').style.opacity=1;
        }
        if(register){
            document.querySelector("#btnRegister").style.opacity= 1;
            document.querySelector('#btnLogin').style.opacity=0.5
        }
    })

    function btnLogin(){
        setRegister(false)
    }

    function btnRegister(){
        setRegister(true)
        
        
    }

  return(
      <div className="LoginPart">
      <img id="imageLogin" src="https://cdn-images.welcometothejungle.com/QpqiOuJLDZR78LX9lYPHEw4uAzpDljuwIsT983t25Uk/rs:auto:2000::/q:85/czM6Ly93dHRqLXByb2R1Y3Rpb24vdXBsb2Fkcy9hcnRpY2xlL2ltYWdlLzExNTQvMTUyOTc3L2RlZmluaXRpb24tY3VsdHVyZS1lbnRyZXByaXNlLmpwZw"/>
      <div className="blocAuth">
      <div className="btnPartLogin">
            <button id="btnRegister" onClick={btnRegister}>
                S'enregistrer
            </button>
            <button id="btnLogin" onClick={btnLogin}>
                Se connecter
            </button>
      </div>
        {!register&& <Login/>}
        {register&& <Register/>}

    </div>
    </div>
    
  )
}

export default Auth