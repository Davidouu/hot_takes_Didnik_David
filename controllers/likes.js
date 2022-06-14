const Sauce = require('../models/thing');

// controlleur des likes et dislikes

exports.likeSauce = (req, res, next) =>{ 
    const likeStatus = req.body.like;
    const sauceId = req.params.id;  
    const userId = req.body.userId;     
    switch(likeStatus){  
        
        // cas 1, ajout d'un like à une sauce

        case 1:
            Sauce.updateOne({ _id: sauceId},
            {  
                $inc: {likes: +1},
                $push: {usersLiked: req.body.userId}
            })
            .then(() => res.status(201).json({ message: 'Ajout du like !'}))
            .catch(error => res.status(400).json({error}));
            break;

        // cas 2 ajout d'un dislike

        case -1:
            Sauce.updateOne({ _id: sauceId},
            {
                $inc: {dislikes: +1},
                $push: {usersDisliked: req.body.userId}
            })
            .then(() => res.status(201).json({message: "Ajout d'un dislike ! "}))
            .catch(error => res.status(400).json({error}));
            break;

        // dernier cas, l'annulation d'un like ou d'un dislike avec la vérification de l'id de l'user, avec celui du like ou dislike 

        case 0: 
            Sauce.findOne({ _id: sauceId })
            .then(sauce =>{
                if(sauce.usersLiked.includes(userId)){
                    Sauce.updateOne({ _id: sauceId},
                        {
                            $inc: {likes: -1},
                            $pull: {usersLiked: userId}
                        })
                    .then(() => res.status(201).json({ message: "Suppression du like !"}))
                    .catch((error) => res.status(400).json({error}));
                }else if(sauce.usersDisliked.includes(userId)){
                    Sauce.updateOne({_id: sauceId},
                        {
                            $inc: {dislikes: -1},
                            $pull: {usersDisliked: userId}
                        })
                    .then(() => res.status(201).json({ message: "Suppression du dislike ! "}))
                    .catch((error) => res.status(400).json({error}));
                }else{
                    res.status(403).json({ message: "requête impossible !"})
                }
            })
            .catch(() => res.status(404).json({ message: "Sauce introuvable !"}));
            break;
    }
};