const User= require('../models/user.models');
const passwordValidator= require('password-validator');
const passwordSchema= new passwordValidator();
const ObjectID = require("mongoose").Types.ObjectId;
const bcrypt=require("bcrypt");

passwordSchema
.is().min(6)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase(1)                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports= async (req,res, next)=>{
    const id= req.params.id;
    checkId(id);
    function checkId(id){
        if (!ObjectID.isValid(id)){
            return res.status(400).send("ID unknown : " + req.params.id);
            }
        else{
            checkCurrentPassword();
        }

    };

    async function checkCurrentPassword(){
        const user= await User.findById(req.params.id);
        if(!user){
            res.send('user not found')
        }
        else{
            bcrypt.compare(req.body.currentPassword, user.password, function (err, isValid) {
                if (isValid) {
                    checkNewPassword();
                }
                else{
                    res.status(400).send('Mot de passe acutel ne correspond pas')
                }
            })
        }
    }

    function checkNewPassword(){
        if(passwordSchema.validate(req.body.newPassword)){
            next()
        }
        else{
            return res.status(400).json({error: `Le mot de passe n'est pas assez fort ${passwordSchema.validate('req.body.password', { list: true })}`})
        }
    }
}
    
        
    /*else{
       const currentPassword= req.body.currentPassword;
       const newPassword= req.body.newPassword;

       const user= await User.findById(req.params.id);

       if(user){
            bcrypt.compare(currentPassword, user.password, function (err, isValid) {
                if (isValid) {
                    const salt = await bcrypt.genSalt();
                    const passwordHash= await bcrypt.hash(req.body.password, salt);
                    console.log(passwordHash)
                    User.findByIdAndUpdate(
                        req.params.id,
                        {password: passwordHash},
                        { new: true },
                        (err, doc) => {
                          if (!err){ 
                            res.send(doc);
                            }
            
                          else {
                              console.log("Update error : " + err);
                            }
                        });
                else{
                    res.send('mot de passe invalide')
                }
            })
       }
       else{
           res.status(400).send('erreur lors de la recherche de la base donées')
       }
       */

    