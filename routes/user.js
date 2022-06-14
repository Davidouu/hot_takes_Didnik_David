const express = require('express');
const router = express.Router();
const passwordV = require('../middleware/password');
const userCtrl = require('../controllers/user');
const rateLimit = require('express-rate-limit')

const userLimiter = rateLimit({
    windowMs : 20  *  60  *  1000 ,  // 20 minutes 
      max : 100 ,  // Limite chaque IP à 100 requêtes par `window` (ici, par 20 minutes)
});

// Routes user, le limiteur de requète, ainsi que le password validator sur le signup 
router.post('/signup', userLimiter, passwordV, userCtrl.signup);
router.post('/login', userLimiter, userCtrl.login);

module.exports = router;