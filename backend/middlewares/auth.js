//Importation de jwt pour controler le cookie d'authentification
const jwt= require('jsonwebtoken');

//Import UserModel pour intéragir avec la DB
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
              res.locals.user= user
              next();
          }
      })
    }
    else{
        res.locals.user=null;
        next();
    }
}

module.exports.requireAuth= (req,res,next)=>{
    const token= req.cookies.jwt; 
    console.log(token)
    console.log(token)
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodedToken)=>{
            if(err){
                res.send(200).send('no TOKEN')
            }
            else{
                next();
            }
        })
    }

    else{
        res.send("no token");
    }
}