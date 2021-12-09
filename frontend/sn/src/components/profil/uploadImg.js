import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../styles/profil/_profil.scss';
import { uploadPicture } from "../../redux/actions/user.actions";
import axios from "axios";

const UploadImg=() =>{

    const [imageUpdate, setImageUpdate]= useState(false);
    const dispatch= useDispatch();
    const userData= useSelector((state)=>state.userReducer)

    console.log(imageUpdate)

    const handlePicture= (e)=>{

  
            let formData = new FormData() ;
    
            formData.append('profilPhoto', imageUpdate);
            const id= userData._id
        
       
        dispatch(uploadPicture(id, formData))
     
    }



  return(
      <>

      {imageUpdate? 
      (<button id="buttonPhotoProfil" onClick={handlePicture}>Validé</button>)
      : (<button id="buttonPhotoProfil" >Mettre à jour la photo</button> )}

      <input type='file' id="updatePhotoProfil" onChange={(e)=> setImageUpdate(e.target.files[0])} />
      
      </>
  )
}

export default UploadImg