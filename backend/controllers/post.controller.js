const Post= require('../models/post.model');
const User= require('../models/user.models');


module.exports.readPost= (req,res)=>{
    Post.find((err, docs)=>{
        if(!err) res.send(docs);
        else console.log('Error to get data:'+ err)
    }).sort({createdAt: -1})
}

module.exports.createPost= async (req,res)=>{
    
    try{
        const post= await Post.create({
            posterId: req.body.posterId,
            message: req.body.message,
            likers:[],
            comments:[]
        });

        res.status(201).json({post})
    }
    catch(err){
        res.send(err)
    }
}

module.exports.updatePost= async (req,res)=>{
    
          Post.findByIdAndUpdate(
            req.params.id,
            {message: req.body.message},
            { new: true },
            (err, doc) => {
              if (!err){  
                res.send(doc);
            }
              else {console.log("Update error : " + err);
            }
            }
          );
        
    }



module.exports.deletePost= (req,res)=>{
    
        Post.findByIdAndRemove(req.params.id, (err, docs)=>{
            if(!err) res.send('Post supprimé');
            else console.log('Delete error :' + err);
        })
}

module.exports.likePost= async(req,res,)=>{
    
        Post.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet:{likers: req.body.userId}
            },
            {new: true},
            (err, docs)=>{
                if(err) return res.status(400).send(err)
                else console.log('Post changed')
            }
        )
        User.findByIdAndUpdate(
            req.body.userId,    
            {
                $addToSet: {likes: req.params.id}
            },
            {new: true},
            (err, docs)=>{
                if(err) return res.status(400).send(err)
                else res.status(200).send(docs);
            }
        )
    }

  
module.exports.unlikePost= async(req,res,)=>{
    Post.findByIdAndUpdate(
        req.params.id,
        {
            $pull:{likers: req.body.userId}
        },
        {new: true},
        (err, docs)=>{
            if(err) return res.status(400).send(err)
            else console.log('Post changed')
        }
    )
    User.findByIdAndUpdate(
        req.body.userId,    
        {
            $pull: {likes: req.params.id}
        },
        {new: true},
        (err, docs)=>{
            if(err) return res.status(400).send(err)
            else res.status(200).send(docs);
        }
    )
}

module.exports.commentPost= async(req,res)=>{
   
   const userCommenter= await User.findById(req.body.userId);
   const pseudoCommenter= userCommenter.pseudo;
   const times= new Date();
 
   
   
    
   Post.findByIdAndUpdate(
        req.params.id,
        {$push: 
            {comments:
                {
                commenterId: req.body.userId,
                commenterPseudo: pseudoCommenter,
                text: req.body.text,
                timestamp: times
                }
            }
        },
        {new: true},
        (err, docs)=>{
            if(err) return res.status(400).send(err)
            //else res.status(200).send(docs);
        }

    )

    User.findByIdAndUpdate(
        req.body.userId,    
        {
            $push: 
            {comments:{
                postId: req.params.id,
                text: req.body.text,
                timestamp: times
                }
            }
        },
        {new: true, upsert: true},
        (err, docs)=>{
            if(err) return res.status(400).send(err)
            else res.status(200).send(docs);
        }
    )
}


module.exports.editComment= async(req,res,next)=>{
    
    Post.findOneAndUpdate(
        {_id:req.params.id, comments:{$elemMatch:{_id:req.body.commentId}}},
        {$set:{
            'comments.$.text': req.body.text
            }
        },
        {new: true},
        (err, docs)=>{
            if(err){ 
                res.send(err)
            }
            else{
                res.send(docs)
            }
        }
    )
    
}

module.exports.deleteComment= (req,res)=>{

    try{
    Post.findByIdAndUpdate(
        req.params.id, 
        {
            $pull:{
                comments: {
                    _id: req.body.commentId
                }
            }
        },
        {new: true},
        (err, docs)=>{
        if(!err) res.send('commentaire supprimé: '+ docs);
        else console.log('Delete error :' + err);
    })
    }
    catch(err){
        res.send(err)
    }
}