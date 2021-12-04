import React, { useEffect, useState } from 'react'
import { UidContext } from './components/context/context';
import RouterReact from './routes/routes';
import './styles/general.scss'
import axios from "axios"





//<h1>SocialNetwork</h1>
     //<img src="https://lmimirror3pvr.azureedge.net/static/media/17752/b74af089-fd86-4c69-b898-609bab43de5b/q319-lesmills-fia-webassets_video-ba.jpg" alt="home_image"/>
function App() {
  const [uid, setUid]= useState(null);

  useEffect( async()=>{
    console.log(uid)
    await axios({
      method:"get",
      url: "http://localhost:5000/jwtid",
      withCredentials: true,
    })
    .then((res)=>{ 
      console.log(res)
      const token= res.data;
      if(token.includes("no token")){
        setUid(false)
      }
      else{
      setUid(res.data)
      }

    })
    .catch((err)=> console.log(err))

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
