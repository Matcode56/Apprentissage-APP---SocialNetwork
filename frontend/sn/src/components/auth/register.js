import React, { useEffect, useState } from "react";
import '../../styles/login/_login.scss';
import axios from "axios";
import Login from "./login";

const Register=() =>{
    const [pseudo, setPseudo]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const [formSubmit, setFormSubmit]= useState(false)


    const handleRegister= async (e)=>{

      e.preventDefault();
      axios({
        method: "post",
        url: "http://localhost:5000/api/user/register",
        withCredentials: true,
        data:{pseudo, email, password},
        })
        .then((res)=>{
          console.log(res);
          setFormSubmit(true);
        
    
        })
        .catch(err=>{
          
          if(!document.querySelector('.errorLogin')){
            const divButton= document.querySelector('.button_Div')
            const createDivErrorMessage= document.createElement('div')
            createDivErrorMessage.classList.add('errorLogin')
            divButton.prepend(createDivErrorMessage)
          }
          
          const  errorResponse= err.response.data;
          console.log(errorResponse)
          if(errorResponse.includes("email")) document.querySelector('.errorLogin').innerHTML= "erreur email";
          if(errorResponse.includes("mot de passe")){
            document.querySelector('.errorLogin').innerHTML= "Mot de passe pas assez fort. <br/> Minimum 6 caractéres, 1 chiffre, 1 majuscule"
          } 
      })
    }
    useEffect(()=>{
        if(formSubmit===true){
        console.log("I'm here")
        const blocForm= document.querySelector('.blocForm');
        
        blocForm.insertAdjacentHTML('afterbegin', 
          `<div class="sucessRegister">Enregistrement fait avec succès</div>`);
      }
    }, [formSubmit])
  

    

  return(

    <>
      {formSubmit ? (
        <Login />
      )
     
      :
      (<div className="blocForm">


        <form>

          <label for="pseudo">Pseudo</label>
          <input type="text" id="pseudo" placeholder="Mathieu56" onChange={(e) => setPseudo(e.target.value)} />

          <label for="email">Email</label>
          <input type="text" id="email" placeholder="patrice@gmail.com" onChange={(e) => setEmail(e.target.value)} />

          <label for="password"> Mot de passe: </label>
          <input type="password" id="password" placeholder="*****" onChange={(e) => setPassword(e.target.value)} />


        </form>
        <div className="button_Div">


          <button onClick={handleRegister}>S'enregistrer</button>
        </div>


      </div>
      )
      }
    
    </>
  )
}

export default Register