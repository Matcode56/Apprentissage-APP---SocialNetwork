import React, {useState, useEffect, useContext} from 'react';
import Auth from '../components/auth/auth';
import { UidContext } from '../components/context/context';
import Profil from './profil';


const Home= ()=>{
    const uid= useContext(UidContext)

  
    return (
          
        <>
            {uid? <Profil/>: <Auth/>}
        </>
    )
}

export default Home