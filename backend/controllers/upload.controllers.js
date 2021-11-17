const fs = require('fs');
const User= require('../models/user.models')

module.exports= (req,res,next)=>{
    registerAndDeleteOlderPhoto()
    function registerAndDeleteOlderPhoto(){

        const arrFichier= getData();

        function getData() {
                files= fs.readdirSync(__dirname+'/../../client/public/PhotoProfil');
                return files
            }
            
        const photoUser= arrFichier.filter(e=> e.includes(req.params.id))

        if(photoUser.length>1){

            const datesPhotos= photoUser.map(e=> e.substring(0, e.indexOf('-User')))
            
            const datesNumber= datesPhotos.map(e=> parseInt(e))

            const NumberToKeepSafe= datesNumber.filter(e => e==Math.max(...datesNumber))

            const arrPhotoToDelete= arrFichier.filter(e=> e.substring(0, e.indexOf('-User'))!==NumberToKeepSafe.toString())


            try{
                arrPhotoToDelete.map(e=> fs.unlinkSync(__dirname+'/../../client/public/PhotoProfil/'+e))
                const nameNewPhoto= fs.readdirSync(__dirname+'/../../client/public/PhotoProfil');
                
                updateLinkPhotoUser(nameNewPhoto)

            }
            catch(err){
                res.send('erreur lors de la suppresion de (des) anciennes photo(s)')
            }

            }

            else{
                updateLinkPhotoUser(nameNewPhoto)
            }

    }


    function updateLinkPhotoUser(nameNewPhoto){
       User.findByIdAndUpdate(
              req.params.id,
              { $set : 
                {picture: "../client/public/PhotoProfil/" + nameNewPhoto}
                },
              { new: true, upsert: true},
              (err, docs) => {
                if(err){
                    console.log("il y a erreur")
                    return res.send({ message: err });
                } 
                else {return res.send(docs)};
              }
            );
        


    }
}

    
