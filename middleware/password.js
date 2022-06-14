const passwordValidator = require('password-validator');

let passwordSchema = new passwordValidator();

// la barrière que je crée pour la création du mot de passe par l'utilisateur

passwordSchema
.is().min(5)                                                           
.has().uppercase()                            
.has().lowercase()                            
.has().digits(2)                             
.has().not().spaces()                       
.is().not().oneOf(['Passw0rd', 'Password123', 'Azerty123']);

// export du middleware de verification du mdp

module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    }else{
        return res.status(400)
        .json({ error: `Le mot de passe n'est pas assez fort !` });
    };   
};