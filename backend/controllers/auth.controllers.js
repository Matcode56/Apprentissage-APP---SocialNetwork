
const User= require('../models/user.models');
const bcrypt= require('bcrypt');
const cryptojs= require('crypto-js');
const jwt= require('jsonwebtoken');
const gestionError= require('../utils/errors.utils')

module.exports.signUp= async (req,res)=>{
    console.log(res.locals);
    const pseudo= req.body.pseudo;
    const email= req.body.email;
    
    const password= await cryptagePassword();
    
    // Cryptage  du password

    async function cryptagePassword(){
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(req.body.password, salt);
    }
  
    //Création de l'utilisateur dans la base de données et cjeck si il n'existe pas déja

    try{
        const user= await User.create({pseudo, email, password});
        res.status(201).json({user: user._id}) 
    }

    catch(err){
        console.log(err)
        const errors= gestionError.signUpErrors(err);
        res.status(400).send(errors);
    }

}

module.exports.login= async(req, res)=>{

    const emailCrypter= cryptojs.AES.encrypt(req.body.email, process.env.KEY_CRYPT_EMAIL).toString();
    console.log(emailCrypter)
    const password= req.body.password;
    const infosUser= await checkEmailAndPassword(emailCrypter, password);

    if(infosUser){
        sendCookie(infosUser._id)
    }
    
    async function checkEmailAndPassword(emailCrypter, password){

        const user= await User.findOne({"email": `${emailCrypter}`});
        if(user){
            console.log('email correct');
            const validPassword= await bcrypt.compare(password, user.password);

            if(validPassword){
                console.log("mot de passe good");
                return user;
            }

            else{
                res.status(401).send('mot de passe incorrect ')
            }
        }
        else{
            res.status(401).send('email incorrect')
        }
    }

    async function sendCookie(userId){
        try{
        const maxAge=60000
        const token = jwt.sign({userId}, process.env.TOKEN_SECRET, {expiresIn: maxAge});
        res.cookie('jwt', token, 
        {    
            httpOnly: true, 
            maxAge
        });
        res.status(200).send('Authentification réussi')
        }   
        catch(err){
            res.status(401).send("erreur lors de l'envoie du token"+ err)
        }
    }
}

module.exports.logout= (req,res)=>{
    res.cookie('jwt', '', {maxAge:1});
    res.redirect('/');
}

