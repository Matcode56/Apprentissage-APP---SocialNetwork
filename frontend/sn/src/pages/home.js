import React, {useState, useEffect, useContext} from 'react';
import { useSelector } from 'react-redux';
import Auth from '../components/auth/auth';
import { UidContext } from '../components/context/context';
import Home from '../components/home/home';
import Profil from './profil';


const HomePage= ()=>{
    const usersData= useSelector((state)=> state.usersReducer)
    const uid= useContext(UidContext)
  
    return (
          
        <>
            {uid? <Home/>: <Auth/>}
        </>
    )
}

export default HomePage