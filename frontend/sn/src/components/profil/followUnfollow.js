import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FollowUnfollow=() =>{

    
    const userData=  useSelector((state)=> state.userReducer)
    const [numberFollowing, setNumberFollowing]= useState(0)

    const followers= userData.followers;
    const following= userData.following;
    useEffect(()=>{
        if(following) setNumberFollowing(following.length)
    },[following])

    console.log(following)
  return(
      <>
        <div className="followFollowing">
                <p>followers <br/> {followers} </p>
                <p>following <br/> {numberFollowing} </p>
        </div>
      </>
  )
}

export default FollowUnfollow