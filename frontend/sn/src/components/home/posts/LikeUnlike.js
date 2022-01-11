import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LikeUnlike=({post, likes}) =>{

    const userData= useSelector((state)=> state.userReducer);
    
    console.log(post, likes)
    const [alreadyLike, setAlreadyLike]= useState(false);

    useEffect(()=>{
        likes.forEach((e)=>{
            if(e= post._id){
                return (setAlreadyLike(false))
            }}
        )
    }, [userData])

    const handleLike= ()=>{

    }

    const handleUnlike= ()=>{
        
    }

  return(
      <>
          {
              alreadyLike?
              (<div className="activeLike">
                    <i class="fas fa-thumbs-up likeButton"></i>
                    <p>Like</p>
                </div>)
              :(<div className="disabledLike">
                    <i class="far fa-thumbs-up"></i>
                    <p>Like</p>
                </div>)
          }
      </>
  )
}

export default LikeUnlike