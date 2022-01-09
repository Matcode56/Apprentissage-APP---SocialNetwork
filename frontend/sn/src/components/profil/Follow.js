import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../redux/actions/user.actions";




const Follow=() =>{

    // Récupération donnée Utilisateur sur Redux 
    const userData=  useSelector((state)=> state.userReducer)
    const dispatch= useDispatch();

    // Récupération info Follower Following
    const [idFollowers, setIdFollowers]= useState(userData.followers);
    const [idFollowing, setIdFollowing]= useState(userData.following);

    const [infosFollowers, setInfosFollowers]= useState();
    const [infosFollowing, setInfosFollowing]= useState();
    
    const [alreadyFollow, setAlreadyFollow]= useState();

    const [displayFollowers, setDisplayFollowers]= useState(false);
    const [displayFollowing, setDisplayFollowing]= useState(false);


    useEffect(()=>{
        if(userData.followers) setIdFollowers(userData.followers)
        if(userData.following) setIdFollowing(userData.following)
    },[userData])

    useEffect(()=>{
      const Followers=[]
      const Following=[]

        if(idFollowers){
          idFollowers.forEach(element=> 
        
            axios.get(`http://localhost:5000/api/user/infoFollow/${element}`)
            .then((res)=>{
                Followers.push(res.data)    
            })
            .catch((err)=> console.log(err)))
        }

        if(idFollowing){
          
          idFollowing.forEach(element=> 
        
            axios.get(`http://localhost:5000/api/user/infoFollow/${element}`)
            .then((res)=>{
              Following.push(res.data)
            })
            .catch((err)=> console.log(err))
          )}

          if(Following) setInfosFollowing(Following)
          if(Followers) setInfosFollowers(Followers)
    },[idFollowers, idFollowing])

    //Changement d'affichage au clic sur Follower ou Following

  

    useEffect(()=>{
      if(displayFollowing){
        const btnPartFollower= document.querySelector('.PartFollower')
        btnPartFollower.style.backgroundColor="#d1ccc7"
      }

      if(displayFollowers){
        const btnPartFollowing= document.querySelector('.PartFollowing')
        btnPartFollowing.style.backgroundColor="#d1ccc7"
      }
    }, [displayFollowing, displayFollowers])

    //Bascule entre Followers et Following 
    const handleChangeDisplayFollow=()=>{
      if(displayFollowers){
        setDisplayFollowers(false);
        setDisplayFollowing(true);
      }
      if(displayFollowing){
        setDisplayFollowing(false)
        setDisplayFollowers(true)
      }
    }

    //Savoir si l'utilisateur suit déja la personne
  

    useEffect(()=>{
      const same=[];
      if(idFollowers.length>0 && idFollowing.length>0){
        idFollowers.forEach((i) =>{ 
          if(idFollowing.includes(i)){
            same.push(i)
          }
        })
      }
      setAlreadyFollow(same)
    },[idFollowing, idFollowers])
    

    //Unfollow Option
    const handleUnfollow= (id, idToUnfollow)=>{
      dispatch(unfollowUser(id, idToUnfollow))
    }

    //Follow Option
    const handleFollow=(id, idToFollow)=>{
      dispatch(followUser(id, idToFollow))
    }

    console.log(infosFollowers)

    

  return(
    <>
      
        <p className="numberFollow" onClick={()=>displayFollowers? setDisplayFollowers(false):setDisplayFollowers(true)}>
          Followers <br/><br/>
          {idFollowers.length} 
        </p>

        <p className="numberFollow" onClick={()=>displayFollowing? setDisplayFollowing(false):setDisplayFollowing(true)}>
          Following <br/><br/>
          {idFollowing.length} 
        </p>

        {displayFollowers
        &&(<div className="displayPartFollow">
            <div id="buttonBack" onClick={()=>setDisplayFollowers(false)}><i class="fas fa-arrow-left"></i></div>
            <p id="pseudoDisplayFollow">{userData.pseudo}</p>
            <div id="buttonFollowPart">
              <p className="PartFollower" onClick={()=>handleChangeDisplayFollow()}>Follower</p>
              <p className="PartFollowing" onClick={()=>handleChangeDisplayFollow()}>Following</p>
            </div>
            <div className="blocNameFollower">
              {infosFollowers&& 
                infosFollowers.map(e=>
                  <div id="infoPersonFollow" key={e._id}>
                    <img src={e.picture}/>
                    <p>{e.pseudo}</p>
                  
                    {alreadyFollow.includes(e._id)?
                      <button onClick={()=>handleUnfollow(userData._id, e._id)}>Unfollow</button>
                      :<button onClick={()=>handleFollow(userData._id, e._id)}>Follow</button>
                    }
                    
                </div>
              )}
            </div>
          </div>)
      }

      {displayFollowing
        &&(<div className="displayPartFollow">
            <div id="buttonBack" onClick={()=>setDisplayFollowing(false)}>
              <i class="fas fa-arrow-left"></i>
            </div>
            <p id="pseudoDisplayFollow">{userData.pseudo}</p>
            <div id="buttonFollowPart">
              <p className="PartFollower" onClick={()=>handleChangeDisplayFollow()}>Follower</p>
              <p className="PartFollowing" onClick={()=>handleChangeDisplayFollow()}>Following</p>
            </div>
            <div id="blocNameFollower">
              {
                infosFollowing.map(e=>
                  <div id="infoPersonFollow" key={e._id}>
                    <img src={e.picture}/>
                    <p>{e.pseudo}</p>
                    <button onClick={()=>handleUnfollow(userData._id, e._id)}>Unfollow</button>
                  </div>
                )}
              </div>
          </div>)
      }

      </>
  )
}

export default Follow