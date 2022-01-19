import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./uploadImg";
import '../../styles/profil/_settings.scss'
import { updateUser } from "../../redux/actions/user.actions";
import axios from "axios";
import cookie from 'js-cookie'
import { deletePost } from "../../redux/actions/post.actions";


const SettingsProfil=({handleProfil}) =>{
    
    // Récupération données utilisateur Redux
    const userData=  useSelector((state)=> state.userReducer);
    const posts= useSelector((state)=> state.postReducers)
    const id= userData._id;
    const dispatch= useDispatch();

    //State
    const [inputMail, setInputMail]= useState();
    const[inputPseudo, setInputPseudo]= useState();
    const [popDeleteUser, setPopDeleteUser]= useState(false);
   
    
  //Modif Pseudo et Mail
   const handlerPseudo= ()=>{
    
     const pseudo= {"pseudo": inputPseudo}
  
     dispatch(updateUser(id, pseudo))
   }

   const handlerEmail= ()=>{
    const email= {"email": inputMail}
    dispatch(updateUser(id, email))
   }

  const handlerDeleteUser= async ()=>{

    //Search and Delete Post User 
      const postId= await getPostIdOfUser();

      function getPostIdOfUser(){
        return posts.filter(e=> e.posterId == id)
      }
    
      if(postId.length>0){
        for(let i=0; i< postId.length ; i++){
          dispatch(deletePost(postId[i]._id))
        }
      }
      
      DeleteUser();
      function DeleteUser(){
        axios.delete(`http://localhost:5000/api/user/${id}`)
        .then((res)=> returnToAuthPage())
        .catch((err)=> console.log(err))   
        
      function returnToAuthPage(){
        const removeCookie=(keyCookie)=>{
          cookie.remove(keyCookie, {expires: 1})
      }
        axios({
              method: 'get',
              url: `http://localhost:5000/api/user/logout`,
              withCredentials: true
          })
          .then(()=>{
              removeCookie('jwt')
          })
          .catch((err)=>{
              console.log(err)
          })
  
          window.location= "/"
        }    
      }
      
   }
  
    
  return(
      <>
      <div id="blocSettingsProfil">
        <div id="backProfil" onClick={handleProfil}> 
          <i class="fas fa-arrow-left"></i>
        </div>

      <UploadImg/>

      <div id="blocUpdateProfil">
        
        <div class="formSettings pseudo">
          <label for="updatePseudo">Pseudo</label>
          <input type="text" id="updatePseudo" placeholder={userData.pseudo} onChange={(e)=>setInputPseudo(e.target.value)}/> 
          {inputPseudo&& <i class="fas fa-check-circle"  onClick={handlerPseudo}></i>}
        </div>

        <div class="formSettings mail">
          <label for="updatePseudo">Mail</label>
          <input type="mail" id="updatePseudo" placeholder={userData.email}  onChange={(e)=>setInputMail(e.target.value)}/> 
          {inputMail&& <i class="fas fa-check-circle" onClick={handlerEmail}></i>}
        </div>
      </div>
      
      <div id="btnDeleteUser" onClick={()=>setPopDeleteUser(true)}>Supprimer votre compte</div>

      {
        popDeleteUser&& 
        (
          <div className="popDeleteUser">
            <h3>Are you sure?</h3>
            <div className="choiceDeleteUser">
              <p onClick={()=>{ handlerDeleteUser(); setPopDeleteUser(false)}}>Oui</p>
              <p onClick={()=> setPopDeleteUser(false)}>Non</p>
            </div>
          </div>
        )
      }
    </div>

    
    </>
  )
}

export default SettingsProfil