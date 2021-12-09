import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/profil/_profil.scss"
import FollowUnfollow from "./followUnfollow";
import UploadImg from "./uploadImg";

const UpdateProfil= () =>{
    const userData=  useSelector((state)=> state.userReducer)
    const [statePicture, setStatePicture]= useState(userData.picture);
    const [namePhoto, setNamePhoto]= useState("")

    
    useEffect(()=>{
        
        if(userData.picture){
            setStatePicture(userData.picture)
        }
        if(statePicture){
            const namePhoto=statePicture.substring(statePicture.indexOf('Profil') +7)
            setNamePhoto(namePhoto)
        } 
    }, [userData, statePicture])
    //const namePhoto=statePicture.substring(statePicture.indexOf('Profil') +7)
    
    

    return(
        <>
        <div className="blocProfil">
            <div className="blocPhoto">
                <p className="pImage">
                <img src={"/upload/PhotoProfil/"+ namePhoto} alt="ok"/>
                </p>
                <UploadImg/>
            </div>

        <div className="blocInfosProfil">
            <div className="contact">
                <p>pseudo: {userData.pseudo} </p>
                <p>contact: {userData.email} </p>
            </div>
            <FollowUnfollow/>
        </div>
        </div>
        </>
  )
}

export default UpdateProfil