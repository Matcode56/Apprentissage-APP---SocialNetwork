import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../styles/profil/_profil.scss';
import { uploadPicture } from "../../redux/actions/user.actions";


const UploadImg=() =>{

    // State qui va stocker la nouvelle photo de profil
    const [imageUpdate, setImageUpdate]= useState(false);

    // Récupération données Store
    const dispatch= useDispatch();
    const userData= useSelector((state)=>state.userReducer)


    //Appel Reducer Redux -> Le reducer se charge d'envoyer la requete de modif
    //                        de la photo et modifie le store Redux
    const handlePicture= (e)=>{
  
        let formData = new FormData() ;
        formData.append('profilPhoto', imageUpdate);
        const id= userData._id
        dispatch(uploadPicture(id, formData))
        setImageUpdate(false);
        console.log(formData)
    }



  return(
      <>
      {userData&& 
      <div id="divPhotoProfil">
        <img id="photoProfil" src={userData.picture} alt="Photo de profil"/>
      </div>}
      <div id="divChoosePhoto">
        <input type='file' id="updatePhotoProfil" onChange={(e)=> setImageUpdate(e.target.files[0])} />
        {imageUpdate&& <i class="fas fa-check-circle" onClick={handlePicture}></i>}
      </div>
      
      </>
  )
}

export default UploadImg