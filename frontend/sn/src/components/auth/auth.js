import React, { useEffect, useState } from "react";
import '../../styles/login/_login.scss'
import Login from "./login";
import Register from "./register";

const Auth=() =>{
    
    //Gestion affichage Partie Login ou Register
    const [displayRegister, setDisplayRegister]= useState(false)

    useEffect(()=>{
        if(!displayRegister){
            document.querySelector("#btnRegister").style.opacity= 0.5;
            document.querySelector('#btnLogin').style.opacity=1;
        }
        if(displayRegister){
            document.querySelector("#btnRegister").style.opacity= 1;
            document.querySelector('#btnLogin').style.opacity=0.5
        }
    })

    function btnLogin(){
        setDisplayRegister(false)
    }

    function btnRegister(){
        setDisplayRegister(true)
        
        
    }

  return(
    <div id="blocLogin">
        <img id="imageLogin" src="https://cdn-images.welcometothejungle.com/QpqiOuJLDZR78LX9lYPHEw4uAzpDljuwIsT983t25Uk/rs:auto:2000::/q:85/czM6Ly93dHRqLXByb2R1Y3Rpb24vdXBsb2Fkcy9hcnRpY2xlL2ltYWdlLzExNTQvMTUyOTc3L2RlZmluaXRpb24tY3VsdHVyZS1lbnRyZXByaXNlLmpwZw"/>
        <div id="blocAuth">
            <div id="btnPartLogin">
                <button id="btnRegister" onClick={btnRegister}>
                    S'enregistrer
                </button>
                <button id="btnLogin" onClick={btnLogin}>
                    Se connecter
                </button>
            </div>
        {!displayRegister&& <Login/>}
        {displayRegister&& <Register/>}

        </div>
    </div>
    
  )
}

export default Auth