const router= require('express').Router();
const authController= require('../controllers/auth.controllers');
const validatePassword= require('../middlewares/validatePassword')

router.post('/register', validatePassword, authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout)



module.exports= router;