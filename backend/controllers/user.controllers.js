const User= require('../models/user.models');
const ObjectID = require("mongoose").Types.ObjectId;
const cryptojs= require('crypto-js');
const bcrypt= require('bcrypt');
const emailValidator= require('email-validator');

module.exports.getAllUsers= async(req,res)=>{
    const users= await User.find().select(['pseudo', 'email', 'followers', 'following', 'likes']);
    res.status(200).json(users);
}

module.exports.getInfosUser= async(req,res)=>{
    const user= await User.findOne({_id: req.params.id}).select(['pseudo', 'email', 'followers', 'following', 'likes']);
    res.status(200).json(user);
}

module.exports.updateUser=(req,res)=>{
    if (!ObjectID.isValid(req.params.id)){
    return res.status(400).send("ID unknown : " + req.params.id);
    }
    
    else{
        const infoUpdate=req.body;
        console.log(infoUpdate);
        let validData= true;
        checkData();
        function checkData(){
            for(const prop in infoUpdate){
                if(prop !== "email" && prop!=="pseudo"){
                    return validData= false;
                }
            }
        }

    if(validData){
        if(!emailValidator.validate(req.body.email)){
                return res.status(400).json({error: "email invalide"})
            }
            else{
                User.findByIdAndUpdate(
                    req.params.id,
                    infoUpdate,
                    { new: true },
                    (err, doc) => {
                      if (!err){ 
                        res.send(doc);
                        }
        
                      else {
                          console.log("Update error : " + err);
                        }
                    });
                };
            
    }

    else{
        res.send('data not valid')
    }
    
    
    }
}

module.exports.updateMdp= async (req,res)=>{
    console.log(req.params.id)
    if (!ObjectID.isValid(req.params.id)){
        return res.status(400).send("ID unknown : " + req.params.id);
        }
        
    else{
       const currentPassword= req.body.currentPassword;
       const newPassword= req.body.newPassword;

       const user= await User.findById(req.params.id);

       if(user){
            bcrypt.compare(currentPassword, user.password, function (err, isValid) {
                if (isValid) {
                res.send('mdp good')
                }
                else{
                    res.send('mot de passe invalide')
                }
            })
       }
       else{
           res.status(400).send('erreur lors de la recherche de la base donées')
       }

    }
}

module.exports.deleteUser= async (req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send("ID unknow: "+ req.params.id)
    }
    else{
        User.findByIdAndRemove(req.params.id, (err, docs)=>{
            if(!err) res.send("utilisateur bien supprimé: "+docs);
            else res.send('Delete error :' + err);
        })
    }
}

module.exports.follow= (req,res)=>{
    if(
        !ObjectID.isValid(req.params.id) ||
        !ObjectID.isValid(req.body.idToFollow)
    ){
    return res.status(400).send('ID unknow: '+ req.params.id);
    }

    else{
        User.findByIdAndUpdate(
            req.params.id,
            { following: req.body.idToFollow },
            { new: true},
            (err, docs) => {
              //if (!err) res.status(201).json(docs);
              if(err) return res.status(400).json(err);
            }
          );

          User.findByIdAndUpdate(
            req.body.idToFollow,
            { followers: req.params.id},
            { new: true},
            (err, docs) => {
              if (!err) res.status(201).json(docs);
              if (err) return res.status(400).json(err);
            }
          );
    }
}

module.exports.unfollow= async (req,res)=>{
    if(
        !ObjectID.isValid(req.params.id) ||
        !ObjectID.isValid(req.body.idToUnfollow)
    ){
    return res.status(400).send('ID unknow: '+ req.params.id);
    }

    else{
       User.findByIdAndUpdate(
            req.params.id,
            { $pull: {following: req.body.idToUnfollow} },
            { new: true},
            (err, docs) => {
              //if (!err) res.status(201).json(docs);
              if(err) return res.status(400).json(err);
            }
          );

         User.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: {followers: req.params.id}},
            { new: true},
            (err, docs) => {
              if (!err) res.status(201).json(docs);
              if (err) return res.status(400).json(err);
            }
          );
        }
    
}