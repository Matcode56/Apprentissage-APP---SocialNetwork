import { castDraft } from "@reduxjs/toolkit/node_modules/immer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/post.actions";
import { getUser } from "../../redux/actions/user.actions";
import userReducer from "../../redux/reducers/user.reducers";
import Card from "./posts/Card";

const Thread=() =>{

  const dispatch= useDispatch();
  const userData =useSelector((state)=> state.userReducer)
  const posts= useSelector((state)=> state.postReducers)

  const [actualPost, setActualPost]= useState()

  useEffect(()=>{
        dispatch(getPosts());

  }, [userData])
 

  const handleRefreshPost= ()=>{
    dispatch(getPosts())
  }

  return(
      <>
        <div id="blocPost">
          <div className="refreshPost" onClick={()=> handleRefreshPost()}>
            <i class="fas fa-redo-alt"></i>
            <p>Refresh</p>
          </div>
          {posts[0]&&  
            posts.map((post)=>{
              return <Card post={post} key={post._id}/>
            })
          }
        
          </div>
        
      </>
  )
}

export default Thread