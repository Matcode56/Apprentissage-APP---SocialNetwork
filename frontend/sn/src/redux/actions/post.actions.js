import axios from "axios";


export const GET_POSTS= "GET_POSTS"

export const getPosts=()=>{
    console.log("ddd")
    return(dispatch)=>{
            axios.get(`http://localhost:5000/api/post`)
            .then((res)=>{
                console.log(res)
                dispatch({type: GET_POSTS, payload: res.data})
            })
            .catch((err)=>console.log(err))
    }
}