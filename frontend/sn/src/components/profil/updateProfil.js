import React from "react";
import { useSelector } from "react-redux";
import "../../styles/profil/_profil.scss"

const UpdateProfil= () =>{
  const userData=  useSelector((state)=> state.userReducer)
  const statePicture= userData.picture;
 
  const namePhoto=statePicture.substring(statePicture.indexOf('Profil') +7)
  console.log(namePhoto)
    

    return(
        <>
        <div className="blocProfil">
            <div className="blocPhoto">
                <p className="pImage">
                <img src={"/upload/PhotoProfil/"+ namePhoto} alt="ok"/>
                </p>
            </div>

        <div className="blocInfosProfil">
            <div className="contact">
                <p>pseudo: {userData.pseudo} </p>
                <p>contact: {userData.email} </p>
            </div>
            <div className="followFollowing">
                <p>followers <br/> {userData.followers} </p>
                <p>following <br/> {userData.following} </p>
            </div>
            </div>
        </div>
        </>
  )
}

export default UpdateProfil