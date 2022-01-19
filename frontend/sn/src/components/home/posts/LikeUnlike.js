import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "../../../redux/actions/post.actions";

const LikeUnlike=({post, likes}) =>{

    const userData= useSelector((state)=> state.userReducer);
    const dispatch= useDispatch();

    const [numberLike, setNumberLike]= useState()
    const [alreadyLike, setAlreadyLike]= useState(false);

    useEffect(()=>{
        likes.forEach((e)=>{
            if(e= post._id){
                return (setAlreadyLike(false))
            }}
        )
        setNumberLike(post.likers.length)
    }, [userData])

    
    const handleLike= ()=>{
        if(!alreadyLike) setAlreadyLike(true)
        if(numberLike){
            const number= numberLike +1
            setNumberLike(number)
        }
        else setNumberLike(1)
        dispatch(likePost(post._id, userData._id))
    }

    const handleUnlike= ()=>{
        if(alreadyLike) setAlreadyLike(false)
        if(numberLike){
            const number= numberLike -1
            setNumberLike(number)
        }
        else setNumberLike(0)
      
        dispatch(unlikePost(post._id, userData._id))
    }

  return(
      <>
          {
              alreadyLike?
              (<div className="activeLike" onClick={()=> handleUnlike()}>
                    <p id="numberLikes">{numberLike}</p>
                    <i class="fas fa-thumbs-up likeButton"></i>
                    <p>Like</p>
                </div>)
              :(<div className="disabledLike" onClick={()=>handleLike()}>
                    <p id="numberLikes">{numberLike}</p>
                    <i class="far fa-thumbs-up"></i>
                    <p>Like</p>
                </div>)
          }
      </>
  )
}

export default LikeUnlike