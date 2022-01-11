import React, {useState, useEffect, useContext} from 'react';
import Auth from '../components/auth/auth';
import { UidContext } from '../components/context/context';
import Home from '../components/home/home';




const HomePage= ()=>{
  
    const uid= useContext(UidContext)
    return (
          
        <>
            {uid? <Home/>: <Auth/>}
        </>
    )
}

export default HomePage