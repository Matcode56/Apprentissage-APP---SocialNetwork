import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts } from "../../redux/actions/post.actions";

const NewPost=() =>{

  const[inputText, setInputText]= useState(false);
  const [inputImg, setInputImg]= useState();
  const [validImg, setValidImg]= useState(false);
  const [messageErrorImg, setMessageErrorImg]= useState(false);
  const [messageErrorSubmit, setMessageErrorSubmit]= useState(false);
  const userData= useSelector((state)=> state.userReducer);
  const dispatch= useDispatch()

  
  useEffect(()=>{   
    if(inputImg){
      if(inputImg.size<2000000) {
          setValidImg(true);
          setMessageErrorImg(false)
        }
      else setMessageErrorImg(true)
    }
  }, [inputImg])


  async function createAndRefresh(data){
    await dispatch(createPost(data))
    dispatch(getPosts())

  }

  const handlePost= ()=>{

    if(inputText && inputImg && validImg=== false) return setMessageErrorSubmit(true)
    if(!inputText || inputText.length <1) return setMessageErrorSubmit(true)

    if(inputImg && validImg){
      const data= new FormData();
      data.append("posterId", userData._id);
      if(inputText) inputText && data.append('message', inputText);
      inputImg && data.append('postImage', inputImg)
      console.log(data.posterId)
      createAndRefresh(data)
    }

    if(inputText.length>1 && !inputImg){
      const data= {"posterId": userData._id, "message": inputText}
      

      //dispatch(createPost(data))
      createAndRefresh(data);
    }
  
  }


  return(
      <div className="blocNewPost">
          <h2>Un moment ou un sujet que vous souhaitez partager avec le réseau?</h2>

          <textarea onChange={(e)=>setInputText(e.target.value)} placeholder="Dites-en plus">

          </textarea>
          <label htmlFor="addImgPost"> Ajoutez une image </label>
          <input type='file' accept=".png, .jpg, .jpeg" id="addImgPost" onChange={(e)=> setInputImg(e.target.files[0])}/>

          {messageErrorImg&& (<p className="errorNewPost">Fichier trop voluminieux, veuillez le comprésser</p>)}

          <button id='submitPost' onClick={()=>handlePost()}>Publier</button>
          {messageErrorSubmit &&(<p className="errorNewPost"> Image ou Texte non valide</p>)}
          
      </div>
  )
}

export default NewPost      