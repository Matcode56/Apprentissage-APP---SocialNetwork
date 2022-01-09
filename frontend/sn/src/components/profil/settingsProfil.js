import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./uploadImg";
import '../../styles/profil/_settings.scss'
import axios from "axios";
import { updateUser } from "../../redux/actions/user.actions";


const SettingsProfil=({handleProfil}) =>{
    
    // Récupération données utilisateur Redux
    const userData=  useSelector((state)=> state.userReducer);
    const [inputMail, setInputMail]= useState();
    const[inputPseudo, setInputPseudo]= useState();
    const [buttonChange, setButtonChange]= useState(false)
    const dispatch= useDispatch();
    const id= userData._id;

   const handlerPseudo= ()=>{
    
     const pseudo= {"pseudo": inputPseudo}
  
     dispatch(updateUser(id, pseudo))
   }

   const handlerEmail= ()=>{
    const email= {"email": inputMail}
    dispatch(updateUser(id, email))
   }
  
    
  return(
      <>
      <div id="blocSettingsProfil">
        <div id="backProfil" onClick={handleProfil}> 
          <i class="fas fa-arrow-left"></i>
        </div>

      <UploadImg/>

      <div id="blocUpdateProfil">
        
        <div class="formSettings pseudo">
          <label for="updatePseudo">Pseudo</label>
          <input type="text" id="updatePseudo" placeholder={userData.pseudo} onChange={(e)=>setInputPseudo(e.target.value)}/> 
          {inputPseudo&& <i class="fas fa-check-circle"  onClick={handlerPseudo}></i>}
        </div>

        <div class="formSettings mail">
          <label for="updatePseudo">Mail</label>
          <input type="mail" id="updatePseudo" placeholder={userData.email}  onChange={(e)=>setInputMail(e.target.value)}/> 
          {inputMail&& <i class="fas fa-check-circle" onClick={handlerEmail}></i>}
        </div>
      </div>
     
    </div>

    
    </>
  )
}

export default SettingsProfil