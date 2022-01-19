import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, getPosts } from "../../../redux/actions/post.actions";
import UpdatePost from "./UpdatePost";

const SettingsPost=({isPoster, idPost}) =>{

    const dispatch= useDispatch();

    const [popSettings, setPopSettings]= useState(false);
    const [popDelete, setPopDelete]= useState(false);

    const handlePopSettings= () =>{
        if(popSettings)setPopSettings(false);
        if (!popSettings)setPopSettings(true)
    }

    function handleDeletePost(){
      dispatch(deletePost(idPost));
   
    }

    const hideSettingsPost=()=>{
        setPopSettings(false)
    }
    

  return(
      <>
        <div className="blocSettingsPost">
            <i class="fas fa-cog buttonSettingsPost" onClick={()=> handlePopSettings()}></i>
            {popSettings && (
                <div className="listSettingsPost">
                {isPoster? (
                  <>
                    <p onClick={()=> setPopDelete(true)}>Delete</p>
                    {popDelete && (
                        <div className="popDeletePost">
                            <h3>Are you sure?</h3>
                            <div className="choiceDeletePost">
                                <p onClick={()=>{ handleDeletePost(); setPopDelete(false)}}>Oui</p>
                                <p onClick={()=> setPopDelete(false)}>Non</p>
                            </div>
                        </div>
                    )}
                    <UpdatePost postId={idPost} hideSettingsPop={hideSettingsPost}/>
                </>
                )
                :(
                    <p>Signaler Post</p>
                )}
               </div>
            )}
        </div>
      </>
  )
}

export default SettingsPost