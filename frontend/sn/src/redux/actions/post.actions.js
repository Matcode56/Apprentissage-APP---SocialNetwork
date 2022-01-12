import axios from "axios";


export const GET_POSTS= "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

export const getPosts=()=>{
    return(dispatch)=>{
            axios.get(`http://localhost:5000/api/post`)
            .then((res)=>{
                console.log(res)
                dispatch({type: GET_POSTS, payload: res.data})
            })
            .catch((err)=>console.log(err))
    }
}

export const likePost= (postId, userId)=>{
    return(dispatch)=>{
        return axios({
            method: "patch",
            url: `http://localhost:5000/api/post/likePost/${postId}`,
            data:{"userId": userId}
        })
        .then((res)=>{
            console.log(res)
            dispatch({type:LIKE_POST, payload:{postId, userId}})
        })
        .catch((err)=> console.log(err))
    }
}

export const unlikePost= (postId, userId)=>{
    return(dispatch)=>{
        return axios({
            method: "patch",
            url: `http://localhost:5000/api/post/unlikePost/${postId}`,
            data:{"userId": userId}
        })
        .then((res)=>{
            dispatch({type:UNLIKE_POST, payload:{postId, userId}})
        })
        .catch((err)=> console.log(err))
    }
}