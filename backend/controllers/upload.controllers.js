//Import module fs pour stocker les images dans notre serveur
const fs = require('fs');

//Import UserModel pour intéragir avec la base de donnée
const User= require('../models/user.models')

module.exports.profilPhoto= (req,res,next)=>{

    //Enregistrement de la nouvelle photo de profil et supression de l'ancienne dans notre système de fichier
    registerAndDeleteOlderPhoto()
    function registerAndDeleteOlderPhoto(){

        const arrFichier= getData();

        function getData() {
                files= fs.readdirSync(__dirname+'/../../frontend/sn/public/upload/PhotoProfil');
           
                return files
            }
            
        const photoUser= arrFichier.filter(e=> e.includes(req.params.id))

        if(photoUser.length>1){

            const datesPhotos= photoUser.map(e=> e.substring(0, e.indexOf('-User')))
            
            const datesNumber= datesPhotos.map(e=> parseInt(e))

            const NumberToKeepSafe= datesNumber.filter(e => e==Math.max(...datesNumber))

            const arrPhotoToDelete= arrFichier.filter(e=> e.substring(0, e.indexOf('-User'))!==NumberToKeepSafe.toString())


            try{
                
                arrPhotoToDelete.map(e=> fs.unlinkSync(__dirname+'/../../frontend/sn/public/upload/PhotoProfil/'+e))
                const nameAllPhoto= fs.readdirSync(__dirname+'/../../frontend/sn/public/upload/PhotoProfil');
                const nameNewPhoto= nameAllPhoto.filter(e=> e.includes(req.params.id))
                
                console.log(nameAllPhoto)
                updateLinkPhotoUser(nameNewPhoto)

            }
            catch(err){
                res.send('erreur lors de la suppresion de (des) anciennes photo(s)')
            }

        }

        else{
                updateLinkPhotoUser(photoUser)
        }

    }

    //Ajout du lien de la photo de profil dans la fiche User
    function updateLinkPhotoUser(nameNewPhoto){
       User.findByIdAndUpdate(
              req.params.id,
              { $set : 
                {picture: "/../../frontend/sn/public/upload/PhotoProfil/" + nameNewPhoto}
                },
              { new: true, upsert: true},
              (err, docs) => {
                if(err){
                    return res.send({ message: err });
                } 
                else {return res.send(docs)};
              }
            );

    }
}

    
