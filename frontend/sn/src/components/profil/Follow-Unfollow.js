import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../redux/actions/user.actions";

const FollowHandler=({idToUnfollowFollow , type}) =>{

    const userData=  useSelector((state)=> state.userReducer)
    const dispatch= useDispatch()
    const [btnForPost, setBtnForPost]= useState(false)
    const [alreadyFollow, setAlreadyFollow]= useState(false);

    
    useEffect(()=>{
      if(type=== "btnForPost"){
        setBtnForPost(true)
      }
      else setBtnForPost(false)
    },[])
    useEffect(()=>{
      if(userData.following){
        if(userData.following.includes(idToUnfollowFollow)) setAlreadyFollow(true);
        else setAlreadyFollow(false)
      }
    }, [userData])
    
    

    const id= userData._id;
    //Unfollow Option
    const handleUnfollow= (idToUnfollow)=>{
        dispatch(unfollowUser(id, idToUnfollow))
      }
  
      //Follow Option
      const handleFollow=(idToFollow)=>{
        dispatch(followUser(id, idToFollow))
      }

  return(
      <>
     {alreadyFollow?
      (
        btnForPost? <button className="btnUnfollowPost" onClick={()=>handleUnfollow(idToUnfollowFollow)}>Unfollow</button>
        : <button className="btnUnfollowProfil" onClick={()=>handleUnfollow(idToUnfollowFollow)}>Follow</button>
      )
      
      :(btnForPost?
        <button className="btnFollowPost" onClick={()=>handleFollow(idToUnfollowFollow)}>Follow</button>
        : <button className="btnFollowProfil" onClick={()=>handleFollow(idToUnfollowFollow)}>Follow</button>
        )
     }
   
      </>
  )
}

export default FollowHandler