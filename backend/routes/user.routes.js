const router= require('express').Router();
const authController= require('../controllers/auth.controllers');
const userController= require('../controllers/user.controllers');
const middleUser= require('../middlewares/user');
const upload= require('../middlewares/upload');
const uploadController= require('../controllers/upload.controllers')
//const fileType = require('file-type');
//const multer= require('multer');



// authentification
router.post('/register', middleUser.checkEmailAndPswRegister, authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout)

// get and modification user
router.get("/", userController.getAllUsers);
router.get("/:id", middleUser.checkId , userController.getInfosUser);
router.put("/:id", middleUser.checkId, middleUser.checkInfoToChange, userController.updateUser);
router.put("/:id/psw", middleUser.checkId, middleUser.checkUpdatePsw, userController.updateMdp);
router.delete("/:id", middleUser.checkId,userController.deleteUser);
router.patch("/:id/follow", userController.follow);
router.patch("/:id/unfollow", userController.unfollow);


//upload

router.post('/photoProfil/:id',middleUser.checkId  ,upload.single('profilPhoto'), uploadController)
module.exports= router;