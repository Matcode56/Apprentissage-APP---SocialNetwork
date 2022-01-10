import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/profil/_profil.scss"
import Follow from "./Follow";
import SettingsProfil from "./settingsProfil";


const HeadProfil= () =>{

    // Récupération données utilisateur Redux
    const userData=  useSelector((state)=> state.userReducer)

    //Affichage paramètre profil
    const [displaySettings, setdisplaySettings]= useState(false)

    const handleProfil=()=>{
        displaySettings? (setdisplaySettings(false)): (setdisplaySettings(true))
        
    }
    
    //Récupération photo de profil
    const [statePicture, setStatePicture]= useState(userData.picture);

    useEffect(()=>{
        
        if(userData.picture){
            setStatePicture(userData.picture)
        }
    }, [userData, statePicture])


    return(
        <>
            {displaySettings?
                (<SettingsProfil handleProfil={handleProfil} stateSettings={displaySettings}/>)
            :
                (<div id="blocProfil">
                
                    <div id="blocPhoto">
                        <p id="pImage">
                            <img src={statePicture} alt="ok"/>
                        </p>
                        <p>pseudo: {userData.pseudo} </p>
                        <p>contact: {userData.email} </p>
                    </div>

                    <div id="blocInfosProfil">
                        <Follow/>
                    </div>
                    <div id="buttonSettings" onClick={handleProfil}> 
                        <button>
                            <i class="fas fa-cog"></i>
                            <p>Modifier profil</p>
                        </button> 
                    </div>
                </div>
                )
            }
        </>
  )
}

export default HeadProfil