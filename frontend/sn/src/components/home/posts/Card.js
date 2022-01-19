import React from "react";
import { useSelector } from "react-redux";
import '../../../styles/post/post.scss'
import FollowHandler from "../../profil/Follow-Unfollow";
import LikeUnlike from "./LikeUnlike";
import SettingsPost from "./SettingsPost"

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

        <div className="postCard" key={key}> 
            {
            usersData[0] && usersData.map((e)=>{
                if(e._id === post.posterId){
                    if(post.posterId === userData._id){
                        return(
                            <div className="cardHeader">
                                <img alt="imageUserPost" src={e.picture} id="photoUserPost"/>
                                <div className="divPseudoData">
                                    <h3>{e.pseudo}</h3>
                                    <p>{transformDate(post.createdAt)}</p>
                                </div>
                                
                                <SettingsPost isPoster={true} idPost={post._id}/>
                            </div>
                        )
                    }
                    else{
                        return  (
                            <div className="cardHeader">
                                <img alt="imageUserPost" src={e.picture} id="photoUserPost"/>
                                <div className="divPseudoData">
                                    <h3>{e.pseudo}</h3>
                                    <p>{transformDate(post.createdAt)}</p>
                                </div>
                                <FollowHandler idToUnfollowFollow={post.posterId} type={"btnForPost"}/>
                                <SettingsPost isPoster={false} idPost={post._id}/>
                            </div>
                            )
                    }
                }
            })
        }
        {
            userData[0]&&
              <LikeUnlike post={post} likes={userData.likes}/>
        }
                  
            <div className="cardMessage">
                <p>{post.message}</p>
                {post.picture&& 
                (   
                <p id="bloc_image">
                    <img src={post.picture}/>
                </p>
                )}
                
            </div>
        </div>

    </>
  )
}

export default Card