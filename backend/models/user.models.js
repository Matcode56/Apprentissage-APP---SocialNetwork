const mongoose= require('mongoose');


const userSchema= new mongoose.Schema(
    {
        pseudo:{
            type: String,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true,
            required: true,
        },

        email:{
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            required: true,
        },

        password:{
            type: String,
            required: true
        },

        picture:{
            type: String, 
        },

        bio:{
            type: String,
            max:1024
        },

        followers:{
            type: [String],
        },

        following:{
            type: [String]
        },

        likes:{
            type:[String],
        },
        comments:{
            type:[
                {
                    postId: String,
                    text: String,
                    timestamp: Number
                }

            ],
        }
    },
    {
        timestamps: true,
    }
)

const userModel= mongoose.model("user", userSchema);
module.exports= userModel;