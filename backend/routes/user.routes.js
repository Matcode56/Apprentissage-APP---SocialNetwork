// Importation router
const router= require('express').Router();

//Import Controllers
const authController= require('../controllers/auth.controllers');
const userController= require('../controllers/user.controllers');
const uploadController= require('../controllers/upload.controllers')

//Import Middlewares
const middleUser= require('../middlewares/user');
const upload= require('../config/upload');



// Authentification
router.post('/register', middleUser.checkEmailAndPswRegister, authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout)

// User
router.get("/", userController.getAllUsers);
router.get("/:id", middleUser.checkId , userController.getInfosUser);
router.get("/infoFollow/:id", middleUser.checkId, userController.getInfoFollow)
router.put("/:id", middleUser.checkId, middleUser.checkInfoToChange, userController.updateUser);
router.put("/:id/psw", middleUser.checkId, middleUser.checkUpdatePsw, userController.updateMdp);
router.delete("/:id", middleUser.checkId, userController.deleteUser);
router.patch("/:id/follow", userController.follow);
router.patch("/:id/unfollow", userController.unfollow);

//Ajouter une photo de profil
router.post('/photoProfil/:id',upload.single('profilPhoto'), uploadController.profilPhoto)

module.exports= router;