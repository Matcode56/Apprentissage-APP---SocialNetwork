import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import FollowHandler from "./Follow-Unfollow";




const Follow=() =>{

    // Récupération donnée Utilisateur sur Redux 
    const userData=  useSelector((state)=> state.userReducer)
    const usersData= useSelector((state)=> state.usersReducer)
    const dispatch= useDispatch();

    const [displayFollowers, setDisplayFollowers]= useState(false);
    const [displayFollowing, setDisplayFollowing]= useState(false);

  
    useEffect(()=>{
      if(displayFollowing){
        const btnPartFollower= document.querySelector('.PartFollower')
        btnPartFollower.style.backgroundColor="#d1ccc7"
      }

      if(displayFollowers){
        const btnPartFollowing= document.querySelector('.PartFollowing')
        btnPartFollowing.style.backgroundColor="#d1ccc7"
      }
    }, [displayFollowing, displayFollowers])

    //Bascule entre Followers et Following 
    const handleChangeDisplayFollow=()=>{
      if(displayFollowers){
        setDisplayFollowers(false);
        setDisplayFollowing(true);
      }
      if(displayFollowing){
        setDisplayFollowing(false)
        setDisplayFollowers(true)
      }
    }


  return(
    <>
      
        <p className="numberFollow" onClick={()=>displayFollowers? setDisplayFollowers(false):setDisplayFollowers(true)}>
          Followers <br/><br/>
          {userData.followers.length} 
        </p>

        <p className="numberFollow" onClick={()=>displayFollowing? setDisplayFollowing(false):setDisplayFollowing(true)}>
          Following <br/><br/>
          {userData.following.length} 
        </p>

        {displayFollowers
        &&(<div className="displayPartFollow">
            <div id="buttonBack" onClick={()=>setDisplayFollowers(false)}><i class="fas fa-arrow-left"></i></div>
            <p id="pseudoDisplayFollow">{userData.pseudo}</p>
            <div id="buttonFollowPart">
              <p className="PartFollower" onClick={()=>handleChangeDisplayFollow()}>Follower</p>
              <p className="PartFollowing" onClick={()=>handleChangeDisplayFollow()}>Following</p>
            </div>
            <div className="blocNameFollower">
              { 
                usersData.map((user)=>{
                  for(let i=0; i<userData.followers.length; i++){
                    if(user._id === userData.followers[i]){
                      return(
                          <div id="infoPersonFollow" key={user._id}>
                          <img src={user.picture}/>
                          <p>{user.pseudo}</p>
                          <FollowHandler idToUnfollowFollow={user._id}/>
                       </div>)
                      }
                  }
                })
              }
            </div>
          </div>)
        }

      {displayFollowing
        &&(<div className="displayPartFollow">
            <div id="buttonBack" onClick={()=>setDisplayFollowing(false)}>
              <i class="fas fa-arrow-left"></i>
            </div>
            <p id="pseudoDisplayFollow">{userData.pseudo}</p>
            <div id="buttonFollowPart">
              <p className="PartFollower" onClick={()=>handleChangeDisplayFollow()}>Follower</p>
              <p className="PartFollowing" onClick={()=>handleChangeDisplayFollow()}>Following</p>
            </div>
            <div id="blocNameFollower">
              {
                usersData.map((user)=>{

                  for(let i=0; i<userData.following.length; i++){
                    if(user._id === userData.followers[i]){
                      return(
                      <div id="infoPersonFollow" key={user._id}>
                        <img src={user.picture}/>
                        <p>{user.pseudo}</p>
                        <FollowHandler idToUnfollowFollow={user._id}/>
                    </div>)
                  }
                }})
              }  
            </div>
          </div>)
        }
      </>)
}

export default Follow