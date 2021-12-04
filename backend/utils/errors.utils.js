module.exports.signUpErrors= (err)=>{
    let errors="";
    

    if(err.keyPattern.hasOwnProperty('email')){
        errors="Email déja utilisé"
    }

    if(err.keyPattern.hasOwnProperty('pseudo')){
        errorPseudoMessage= "Pseudo incorrect ou déja utilisé"
        errors= errorPseudoMessage;
    }
    console.log(errors)
    
    return errors
}
