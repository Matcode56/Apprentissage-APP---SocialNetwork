import React, { useEffect, useState } from 'react'
import { UidContext } from './components/context/context';
import RouterReact from './routes/routes';
import './styles/general.scss'
import axios from "axios"
import { useDispatch } from 'react-redux';
import {getUser} from './redux/actions/user.actions'
import { getAllUsers } from './redux/actions/users.actions';
import { getPosts } from './redux/actions/post.actions';


function App() {
  const [uid, setUid]= useState(null);
  const dispatch= useDispatch();

  // Récupération du Token de l'utlisateur 
  useEffect( async()=>{
    await axios({
      method:"get",
      url: "http://localhost:5000/jwtid",
      withCredentials: true,
    })
    .then((res)=>{ 
      const token= res.data;
      if(token.includes("no token")){
        setUid(false)
      }
      else{
      setUid(res.data)
      }
    })
    .catch((err)=> console.log(err))
    // Récupération des infos utilisateur depuis son token et envoie des infos dans le store Redux
    if(uid){
      dispatch(getUser(uid))
      dispatch(getAllUsers())
      dispatch(getPosts())
    }
  }, [uid])




  return (
    <>
      <UidContext.Provider value={uid}>
        <RouterReact/>
      </UidContext.Provider>
    </>
  );
}

export default App;
