import React, {useState, useEffect, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../components/auth/auth';
import { UidContext } from '../components/context/context';
import Home from '../components/home/home';
import { getPosts } from '../redux/actions/post.actions';
import Profil from './profil';


const HomePage= ()=>{
    const usersData= useSelector((state)=> state.usersReducer)
    const uid= useContext(UidContext)
    const dispatch= useDispatch();

    const [postLoaded, setPostLoaded]= useState(false)
    
    useEffect(()=>{
        if(!postLoaded){
            dispatch(getPosts())
            setPostLoaded(true)
        }
    }, [postLoaded])

    return (
          
        <>
            {uid? <Home/>: <Auth/>}
        </>
    )
}

export default HomePage