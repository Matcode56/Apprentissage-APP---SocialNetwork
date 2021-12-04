//Importation module passwordValidator et emailValidator afin de checker l'email et le password
const passwordValidator= require('password-validator')
const emailValidator= require('email-validator');
const passwordSchema= new passwordValidator();

//Importation de bcrypt afin de comparer les passwords hasher de la base de données avec le password entrant.
const bcrypt=require("bcrypt");

//Importation du model User pour intéragir avec la base de donnée
const User= require('../models/user.models')

passwordSchema
.is().min(6)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase(1)                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


module.exports.checkEmailAndPswRegister=(req,res, next)=>{

    if(emailValidator.validate(req.body.email)){
        if(passwordSchema.validate(req.body.password)){
            next()
        }
        else{
            return res.status(400).send(`Le mot de passe n'est pas assez fort ${passwordSchema.validate('req.body.password', { list: true })}`)
        }
    }
    else{
        return res.status(400).send("email invalide")
    }
    
}

module.exports.checkId= async (req,res, next) =>{
    const id= req.params.id;
    User.findById(idToCheck, function(err, docs){
        if(err || !docs){
            res.send('erreur id User');
        }
        else next();
    })
}



module.exports.checkUpdatePsw= async (req,res, next)=>{
    
    checkCurrentPassword();

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

module.exports.checkInfoToChange= async(req,res, next) =>{
    const infoUpdate=req.body;
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
        if(infoUpdate.hasOwnProperty('email')){
            if(!emailValidator.validate(req.body.email)){
                return res.status(400).json({error: "email invalide"})
            }
            else{
                next();
            }
        }
        else{
            next();
        }
        
    }
    else{
        res.status(400).send('data non valide')
    }
}