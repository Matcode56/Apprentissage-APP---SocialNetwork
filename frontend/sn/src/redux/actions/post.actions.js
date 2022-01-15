import axios from "axios";


export const GET_POSTS= "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const CREATE_POST= "CREATE_POST";
export const DELETE_POST = "DELETE_POST";

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

export const createPost= (data)=>{
    return (dispatch)=>{
        if(data.posterId && data.message){
            let posterId=data.posterId;
            let message= data.message;
            return axios({
                method: "post",
                url:(`http://localhost:5000/api/post/`),
                data: {posterId, message}
            })
            .then((res) =>{
                console.log(res.data)
            })
            .catch((e)=>console.log(e))
            }
            
        else{
            return axios({
                method: "post",
                url:(`http://localhost:5000/api/post/`),
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                        }
            })
            .then((res) =>{
                console.log(res.data)
            })
            .catch((e)=>console.log(e))
            }
        }
}

export const deletePost= (id)=>{
    return(dispatch)=>{
        axios.delete(`http://localhost:5000/api/post/${id}`)
            .then((res)=>{
                            console.log(res)
                        })
            .catch((err)=> console.log(err))
    }
}