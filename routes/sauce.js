const express = require('express');
const router = express.Router();    
const sauceCtrl = require('../controllers/sauce');
const likesCtrl = require('../controllers/likes');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const rateLimit = require('express-rate-limit')

const sauceLimiter = rateLimit({
    windowMs : 20  *  60  *  1000 ,  // 20 minutes 
    max : 1000 ,  // Limite chaque IP à 1000 requêtes par `window` (ici, par 20 minutes)
});

// Toutes les routes CRUD en lien avec les sauces, avec le limiteur de requète, le middleware de multer pour le create et update et celui de l'authentification, 
// et les controllers des sauces et des likes
router.post("/",sauceLimiter, multer, auth, sauceCtrl.createThing);
router.put('/:id', sauceLimiter, multer, auth, sauceCtrl.modifyThing);
router.delete('/:id', sauceLimiter, auth, sauceCtrl.deleteThing);
router.get('/', sauceLimiter, auth, sauceCtrl.getAllThings);
router.get('/:id', sauceLimiter, auth, sauceCtrl.getOneThing);
router.post('/:id/like', sauceLimiter, auth, likesCtrl.likeSauce);

// export de mes routes

module.exports = router;