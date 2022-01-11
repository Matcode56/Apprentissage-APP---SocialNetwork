import { castDraft } from "@reduxjs/toolkit/node_modules/immer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/post.actions";
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
  if(posts)console.log(posts)
  console.log(posts)

  return(
      <>
        <div className="blocComment">
          {posts[0] && 
            posts.map((post)=>{
              return <Card post={post} key={post._id}/>
            })
          }
        
          </div>
        
      </>
  )
}

export default Thread