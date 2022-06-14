const multer = require('multer');

// dictionnaire d'extensions à traduire

const MIME_TYPES = {                
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

// middleware multer pour l'enregistrement d'image 

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, `${name.split(`.`)[0]}_${Date.now()}.${extension}`);
        console.log('callback :');
        console.log(callback);
    }        
});

module.exports = multer({storage: storage}).single('image');