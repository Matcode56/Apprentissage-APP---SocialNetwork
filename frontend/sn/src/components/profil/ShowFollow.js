import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


/*export const ShowFollow= ()=>{

    // Récupération donnée Utilisateur sur Redux 
    const userData=  useSelector((state)=> state.userReducer)
    const idUser= userData._id;
    const followers= userData.followers;
    const following= userData.following;

    //State Image/Pseudo Follow
    const [infosFollowers, setInfosFollowers]= useState();
    const [infosFollowing, setInfosFollowing]= useState();

    //
    useEffect(()=>{
        const Followers=[]
        const Following=[]
        
        if(followers.length>0){
            followers.forEach(element=> 
                axios.get(`http://localhost:5000/api/user/infoFollow/${element}`)
                    .then((res)=>{
                        Followers.push(res.data)  
              })
              .catch((err)=> console.log(err)))
          }
  
          if(following.length>0){
            const test=[]
            following.forEach(element=> 
          
              axios.get(`http://localhost:5000/api/user/infoFollow/${element}`)
              .then((res)=>{
                Following.push(res.data)
              })
              .catch((err)=> console.log(err)))
          
          if(Following) setInfosFollowing(Following)
          if(followers) setInfosFollowers(Followers)
          
        }
      }, [followers, following])
    
      //Changement d'affichage au clic sur Follower ou Following

    const [displayFollowers, setDisplayFollowers]= useState(false);
    const [displayFollowing, setDisplayFollowing]= useState(false);

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

    return(
       <>
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
              {infosFollowing&& 
                infosFollowing.map(e=>
                  <div id="infoPersonFollow" key={e._id}>
                    <img src={e.picture}/>
                    <p>{e.pseudo}</p>
                    <button>Suppr</button>
              
                  </div>
                )}
              </div>
          </div>)
      }
    </> 
    )
}*/