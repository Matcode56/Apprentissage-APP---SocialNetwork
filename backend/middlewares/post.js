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
    Post.findById(idToCheck, function(err, docs){
        if(err || !docs){
            res.send('PostId unknow');
        }
        
        else next()
    })
}

module.exports.checkIdUser= (req, res, next)=>{
    const idToCheck=req.body.userId;
    User.findById(idToCheck, function(err, docs){
        if(err || !docs){
            res.send('erreur id User');
        }
        else next();
    })
}


module.exports.checkDataComment= (req, res, next) =>{
    const infoUpdate=req.body;
    let validData= true;
    checkData();
    function checkData(){
        for(const prop in infoUpdate){
            if(
                prop !== "userId" 
                && prop!== "text"
                || !infoUpdate.hasOwnProperty("userId")
                || !infoUpdate.hasOwnProperty("text")
                )
                {
                return validData= false
            }
        }
    }
  
    if(validData) next();
    else res.status(400).send('data non valide')    
}

module.exports.checkComment=(req, res, next)=>{

    main()
    async function main(){
        const dataPost= await getDataPost();
        const commentData= dataPost.comments;
        const validData= await checkData(commentData);
        if(validData){
            next();
        }
        else{
            res.send('userId ou commentId incorrect')
        }

    }

    async function getDataPost(){
        try{
            return await Post.findById(req.params.id)
        }
        catch(err){
            res.send(err)
        }
    }
    
     function checkData(data){
        
        return data.some((e)=>e._id == req.body.commentId && e.commenterId == req.body.userId);
        }
}
    

    

    



