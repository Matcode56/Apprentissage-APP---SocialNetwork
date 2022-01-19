import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../../redux/actions/post.actions";

const UpdatePost=({postId, hideSettingsPop}) =>{

    const [popUpdate, setPopUpdate]= useState(false);
    const [inputText, setInputText]= useState(false);
    const [errorMessage, setErrorMessage]= useState(false);

    const dispatch= useDispatch();

    const handleUpdatePost= ()=>{
        if(inputText.length>0){
            dispatch(updatePost(postId, inputText))
            hideSettingsPop()
        }
        else setErrorMessage(true);
    }

    //onClick={()=> setPopUpdate(true)}
  return(
      <>
        <p onClick={()=> setPopUpdate(true)}>Update</p>
        {
            popUpdate&& (
                <div className="popUpdatePost">
                    <h3>Modifier votre message:</h3>
                    <textarea onChange={(e)=> setInputText(e.target.value)}>

                    </textarea>
                    {errorMessage&& (
                            <p className="errorUpdatePost">
                                Veuillez saisir un message
                            </p>
                        )}
                    <div className='buttonUpdatePost'>
                        
                        <div onClick={()=>setPopUpdate(false)}>Annuler</div>
                        <div onClick={()=>handleUpdatePost()}>Valider</div>
                    </div>
                </div>
            )
        }
      </>
  )
}

export default UpdatePost