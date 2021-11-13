const Post= require('../models/post.model');
//const UserModel= require('../models/user.models');
const ObjectID= require('mongoose').Types.ObjectId;

module.exports.readPost= (req,res)=>{
    Post.find((err, docs)=>{
        if(!err) res.send(docs);
        else console.log('Error to get data:'+ err)
    })
}

module.exports.createPost= async (req,res)=>{
    try{
        const post= await Post.create({
            posterId: req.body.posterId,
            message: req.body.message,
            likers:[],
            comments:[]
        }
        );
        res.status(201).json({post})
    }
    catch(err){
        res.send(err)
    }
}

module.exports.updatePost= async (req,res)=>{
    if (!ObjectID.isValid(req.params.id)){
    return res.status(400).send("ID unknown : " + req.params.id);
    }
    
    else{
          Post.findByIdAndUpdate(
            req.params.id,
            {message: req.body.message},
            { new: true },
            (err, doc) => {
              if (!err){
                console.log(req.body.message);
                console.log(doc)     
                res.send(doc);
            }

              else {console.log("Update error : " + err);
            }
            }
          );
        };
    }



module.exports.deletePost= (req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send("ID unknow: "+ req.params.id)
    }
    else{
        Post.findByIdAndRemove(req.params.id, (err, docs)=>{
            if(!err) res.send(docs);
            else console.log('Delete error :' + err);
        })
    }
}