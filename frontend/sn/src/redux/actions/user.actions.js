import axios from "axios"


export const GET_USER= "GET_USER";
export const UPLOAD_PICTURE="UPLOAD_PICTURE";
export const UNFOLLOW_USER="UNFOLLOW_USER"
export const FOLLOW_USER="FOLLOW_USER"
export const UPDATE_USER="UPDATE_USER"

// Récupération des infos de l'utilisateur depuis son Token
export const getUser= (uid)=>{
    return (dispatch)=>{
        axios.get(`http://localhost:5000/api/user/${uid}`)
        .then((res)=>{
            dispatch({type: GET_USER, payload: res.data})
        })
        .catch((err)=> console.log(err))
    }
}

export const uploadPicture= (id, data)=>{
    return(dispatch)=>{
        return axios({
            method: "POST",
            url: `http://localhost:5000/api/user/photoProfil/${id}`,
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
                    }
        })
        .then((res)=>{
            dispatch({type: UPLOAD_PICTURE, payload: res.data.picture})
        })

        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const unfollowUser= (id, idToUnfollow)=>{
        return (dispatch)=>{
            axios({
            method: "patch",
            url: `http://localhost:5000/api/user/${id}/unfollow`,
            data: {idToUnfollow},
        })
        .then((res)=>{
            dispatch({type:UNFOLLOW_USER, payload:{idToUnfollow}})
        })
        .catch((err)=> console.log(err))
    }
}

export const followUser= (id, idToFollow)=>{
    return (dispatch)=>{
        axios({
            method: "patch",
            url: `http://localhost:5000/api/user/${id}/follow`,
            data: {idToFollow},
        })
        .then((res)=>{
            dispatch({type:FOLLOW_USER, payload:{idToFollow}})
        })
        .catch((err)=> console.log(err))
    }
}

export const updateUser=(id, infoToChange)=>{
    
    return (dispatch)=>{
        axios({
            method: "put",
            url: `http://localhost:5000/api/user/${id}`,
            data: infoToChange,
        })
        .then((res)=>{
            dispatch({type:UPDATE_USER, payload:infoToChange})
        })
        .catch((err)=> console.log(err))
    }
}