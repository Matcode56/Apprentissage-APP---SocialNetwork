import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/post.actions";

const Thread=() =>{

  const dispatch= useDispatch();
  const posts= useSelector((state)=> state.postReducers)

  if(posts)console.log(posts)


  return(
      <>
        <div>
          {posts[1]._id}
          
          </div>
        
      </>
  )
}

export default Thread