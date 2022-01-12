import { GET_POSTS, LIKE_POST, UNLIKE_POST } from "../actions/post.actions"

const initialState={

}

export default function postReducer(state= initialState, action){
    switch(action.type){
        case GET_POSTS:
            return  action.payload;
        case LIKE_POST:
                const newState= state.map((post) => {
                if (post._id === action.payload.postId) {
                  return {
                    ...post,
                    likers: [action.payload.userId, ...post.likers],
                  };
                }
               else return post;
            });

            return newState;
        
        case UNLIKE_POST:
                return state.map((post)=>{
                if(post._id === action.payload.postId){
                    return{
                        ...post,
                        likers: post.likers.filter((id)=> id !== action.payload.userId)
                    }
                }
                else return post
            })

            default:
            return initialState
    }
}