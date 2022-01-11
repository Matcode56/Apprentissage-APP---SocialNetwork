import React from "react";
import { useSelector } from "react-redux";
import '../../../styles/post/post.scss'
import FollowHandler from "../../profil/Follow-Unfollow";
import LikeUnlike from "./LikeUnlike";

const Card=({post, key}) =>{

    const usersData= useSelector((state)=> state.usersReducer);
    const userData= useSelector((state)=> state.userReducer);
    
    //Modif date
    function transformDate(date){
        const newDate= new Date(date)
        const options={
                
                hour: "2-digit",
                minute: "2-digit",
                weekday: "short",
                year: "2-digit",
                month: "short",
                day: "numeric"
        }
        return newDate.toLocaleDateString('fr-FR', options)
    }
    
    //Unfollow / Follow




  return(
      <>

        <div className="commentCard" key={key}> 
            {
            usersData.map((e)=>{
                if(e._id === post.posterId){
                    if(post.posterId === userData._id){
                        return(
                            <div className="cardHeader">
                                <img src={e.picture}/>
                                <h3>{e.pseudo}</h3>
                                <p>{transformDate(post.createdAt)}</p>
                            </div>
                        )
                    }
                    else{
                        return  (
                            <div className="cardHeader">
                                <img src={e.picture}/>
                                <h3>{e.pseudo}</h3>
                                <FollowHandler idToUnfollowFollow={post.posterId}/>
                                <p>{transformDate(post.createdAt)}</p>
                            </div>
                            )
                    }
                   
                }
            })
        }
            <LikeUnlike post={post} likes={userData.likes}/>
            <div className="cardMessage">
                {post.message}
            </div>
        </div>

    </>
  )
}

export default Card