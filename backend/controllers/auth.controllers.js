//Import du model User pour intéragir avec la base de donnée
const User= require('../models/user.models');

//Import de bcrypt pour hasher le password dans la base de donnée.
const bcrypt= require('bcrypt');

//Import de jsonwebtoken pour créer des cookies signé.
const jwt= require('jsonwebtoken');

const gestionError= require('../utils/errors.utils')

module.exports.signUp= async (req,res)=>{
    console.log(res.locals);
    const pseudo= req.body.pseudo;
    const email= req.body.email;
    
    const password= await cryptagePassword();
    
   async function cryptagePassword(){
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(req.body.password, salt);
    }
  
    //Création de l'utilisateur dans la base de données et check si il n'existe pas déja

    try{
        const user= await User.create({pseudo, email, password});
        res.status(201).json({user: user._id}) 
    }

    catch(err){
        console.log(err)
        const errors= gestionError.signUpErrors(err);
        console.log(errors)
        res.status(400).send(errors);
    }
}

module.exports.login= async(req, res)=>{

    const email= req.body.email;
    const password= req.body.password;
    const infosUser= await checkEmailAndPassword(email, password);

    if(infosUser){
        sendCookie(infosUser._id)
    }
    
    async function checkEmailAndPassword(email, password){

        const user= await User.findOne({"email": email});
        if(user){
            const validPassword= await bcrypt.compare(password, user.password);

            if(validPassword){
                return user;
            }

            else{
                res.status(401).send("mot de passe incorrect")
            }
        }
        else{
            res.status(401).send('email incorrect')
        }
    }

    //Création du cookie pour authentifier l'user sur les prochaines interactions
    async function sendCookie(userId){
        try{
        const maxAge=60000000000000000000000
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

