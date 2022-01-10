import axios from "axios";

export const GET_ALL_USERS= "GET_ALL_USERS"

export const getAllUsers= ()=>{
    return(dispatch)=>{
        axios.get(`http://localhost:5000/api/user`)
        .then((res)=>{
            dispatch({type: GET_ALL_USERS, payload: res.data})
        })
        .catch((err)=> console.log((err)))
    }
}
