const Post= require('../models/post.model');
const User= require('../models/user.models');

module.exports.checkPosterId= async(req,res,next)=>{
    const idToCheck= req.body.posterId;
    User.findById(idToCheck, function(err, docs){
        if(docs){
            next();
        }
        
        if(err){
            res.send('erreur postId');
        }
    })
}

module.exports.checkPostId= (req, res, next)=>{
    const idToCheck= req.params.id;
    console.log(idToCheck)
    Post.findById(idToCheck, function(err, docs){
        if(docs){
            next();
        }
        if(!docs) res.send('postId unknow');

        if(err){
            res.send('PostId unknow');
        }
    })
}
