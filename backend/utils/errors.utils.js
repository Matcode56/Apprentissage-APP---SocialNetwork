module.exports.signUpErrors= (err)=>{
    let errors={pseudo: '', email: ''}
   
    if(err.keyPattern.hasOwnProperty('pseudo')){
        errors.pseudo="Pseudo incorrect ou déja utilisé"
    }

    if(err.keyPattern.hasOwnProperty('email')){
        errors.email="Email incorrect ou déja utilisé"
    }
    
    return errors
}
