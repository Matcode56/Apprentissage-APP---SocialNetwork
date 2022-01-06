import axios from "axios"


export const GET_USER= "GET_USER";
export const UPLOAD_PICTURE="UPLOAD_PICTURE";

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

/*export const getInfoFollower= (data)=>{
    return(dispatch)=>{
        const arrayInfoFollower=
            data.forEach(element=> 
                axios.get(`http://localhost:5000/api/user/infoFollow/${element}`)
            .then((res)=>{
            )
        })
        .catch((err)=> console.log(err))
        })
    }*/