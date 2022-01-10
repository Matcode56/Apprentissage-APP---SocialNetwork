import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../redux/actions/user.actions";

const FollowHandler=({idToUnfollowFollow}) =>{

    const userData=  useSelector((state)=> state.userReducer)
    const usersData= useSelector((state)=> state.usersReducer)
    const dispatch= useDispatch()

    const [alreadyFollow, setAlreadyFollow]= useState(false);


    useEffect(()=>{
        if(userData.following.includes(idToUnfollowFollow)) setAlreadyFollow(true);
        else setAlreadyFollow(false)
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
     {
      alreadyFollow?
      (<button onClick={()=>handleUnfollow(idToUnfollowFollow)}>Unfollow</button>)
      :(<button onClick={()=>handleFollow(idToUnfollowFollow)}>Follow</button>)
     }
   
      </>
  )
}

export default FollowHandler