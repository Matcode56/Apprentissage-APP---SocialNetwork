import React,{useState} from "react";
import { useSelector } from "react-redux";
import UploadImg from "./uploadImg";
import '../../../styles/profil/_settings.scss'

const SettingsProfil=({handleProfil}) =>{
    
    // Récupération données utilisateur Redux
    const userData=  useSelector((state)=> state.userReducer);
  
    
  return(
      <>
      <div id="blocSettingsProfil">
        <div id="backProfil" onClick={handleProfil}> 
          <i class="fas fa-arrow-left"></i>
        </div>

      <UploadImg/>

      <div id="blocUpdateProfil">
        <label for="updatePseudo">Pseudo</label>
        <input type="text" id="updatePseudo" placeholder={userData.pseudo}/> 

        <label for="updatePseudo">Mail</label>
        <input type="mail" id="updatePseudo" placeholder={userData.email}/> 
      </div>
     
    </div>

    
    </>
  )
}

export default SettingsProfil