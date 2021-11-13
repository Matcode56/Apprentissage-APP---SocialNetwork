const jwt= require('jsonwebtoken');
const UserModel= require('../models/user.models')

module.exports.checkUser=(req,res, next)=>{
    const token= req.cookies.jwt;
    

    if(token){
      jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodedToken)=>{
          if(err){
              res.cookie('jwt', '', {maxAge:1})
              next();
          }
          else{
              console.log(decodedToken)
              let user= await UserModel.findById(decodedToken.userId);
              console.log(user);
              next();
          }

      })
    }
    else{
        next();
    }
}

module.exports.requireAuth= (req,res,next)=>{
    const token= req.cookies.jwt; 
    console.log(token)
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodedToken)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(decodedToken)
                next();
            }
        })
    }

    else{
        console.log('no token');
    }
}