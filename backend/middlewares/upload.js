const multer= require('multer');
const User= require('../models/user.models');



    const storage= multer.diskStorage({
        destination: (req, file, cb)=>{
            if(file.fieldname=== 'profilPhoto') {
                cb(null,`${__dirname}/../../client/public/PhotoProfil`)
            }
            if(file.fieldname === 'postImage'){
                cb(null,`${__dirname}/../../client/public/PhotoPost`)
            }
        }, 
        filename: (req, file, cb)=>{
            console.log(file)
            let mimetype= file.mimetype;
            let suffix= mimetype.replace('image/', '')
            
            cb(null, Date.now()+'-User-'+ req.params.id+ '.'+ suffix.replace('img/', ''))
        }   
    }) 
    
    const upload = multer({storage: storage, fileFilter: (req, file, cb)=> {
        console.log(file.mimetype)
         if(
             file.mimetype !== "image/jpg" 
         &&  file.mimetype !== "image/png" 
         &&  file.mimetype !== "image/jpeg" 
         ){
             throw Error ('invalid file')
         } 
         else {
           cb(null, true);   
         }},
         limits:{fileSize:2000000},
       });

    module.exports= upload
   
