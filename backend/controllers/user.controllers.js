//Import UserModel pour intéragir avec la base de donnée
const User= require('../models/user.models');
const ObjectID = require("mongoose").Types.ObjectId;

//Ajout de bcrypt pour hasher le mot de passe updated
const bcrypt= require('bcrypt');


module.exports.getAllUsers= async(req,res)=>{
    const users= await User.find().select(['pseudo', 'email', 'followers', 'following', 'likes','picture']);
    if(users)res.status(200).json(users);
    else res.status(400).send('erreur')
}

module.exports.getInfosUser= async(req,res)=>{
    const user= await User.findOne({_id: req.params.id}).select(['pseudo', 'email', 'followers', 'following', 'likes', 'picture']);
    res.status(200).json(user);
}

module.exports.getInfoFollow= async(req,res)=>{
    const user= await User.findOne({_id: req.params.id}).select(['pseudo', 'picture'])
    res.status(200).json(user);
}

module.exports.updateUser=(req,res)=>{
    
        const infoUpdate=req.body;
        
        User.findByIdAndUpdate(
            req.params.id,
            infoUpdate,
            { new: true },
            (err, doc) => {
                if (!err){ 
                    console.log(doc)
                    res.send(doc);
                }
        
                else {
                    console.log("Update error : " + err);
                }
            });
    };
            
    

    

module.exports.updateMdp= async (req,res)=>{
    const passwordHash= await cryptagePassword();

    async function cryptagePassword(){
        const salt = await bcrypt.genSalt();
        const Hash= await bcrypt.hash(req.body.newPassword, salt);
        return Hash
    }


    User.findByIdAndUpdate(
        req.params.id,
        {password: passwordHash},
        {new: true},
        (err, docs)=>{
            if(!err){
                res.status(200).send('mdp changed: '+ docs)
            }
            else{
                res.send(400).send(err)
            }
        }
    )

}

module.exports.deleteUser= async (req,res)=>{
    
        User.findByIdAndRemove(req.params.id, (err, docs)=>{
            if(!err) res.send("utilisateur bien supprimé: "+docs);
            else res.send('Delete error :' + err);
        })
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
            {$addToSet: {following: req.body.idToFollow} },
            { new: true},
            (err, docs) => {
              //if (!err) res.status(201).json(docs);
              if(err) return res.status(400).json(err);
            }
          );

          User.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: {followers: req.params.id}},
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