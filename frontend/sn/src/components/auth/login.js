import React, { useState } from "react";
import '../../styles/login/_login.scss';
import axios from "axios";

const Login=() =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail]= useState(false);
  const [errorPassword, setErrorPassword]= useState(false);

  const handleLogin= async (e)=>{
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/api/user/login",
      withCredentials: true,
      data:{email, password},
      })
      .then((res)=>{
  
        window.location = "/";
  
      })
      .catch(err=>{
        
        const messageError= err.response.data;
        
        if(messageError.includes('email')){
          errorPassword&& setErrorPassword(false)
    
          setErrorEmail(true)
        }
        if(messageError.includes('mot de passe')){
          errorEmail&& setErrorEmail(false)
          setErrorPassword(true)
        }
      })
  }


  return(

    <div className= "blocForm">
    
        <form id="formLogin">
            <label for="email">Email</label>
            <input type="text" id="email" placeholder="patrice@gmail.com"  onChange={(e) => setEmail(e.target.value)}/>
            
            <label for="password">Password: </label>
            <input type="password" id="password" placeholder="*****" onChange={(e) => setPassword(e.target.value)}/>
        </form>
        <div className="button_Div">
            {
            errorEmail&& (<p className="errorLogin">Email incorrect</p>)}
            {errorPassword&& (<p className="errorLogin">Mot de passe incorrect</p>)
            }
            <button onClick={handleLogin}>Connexion</button>
            
        </div>
        
        
    </div>
  )
}

export default Login