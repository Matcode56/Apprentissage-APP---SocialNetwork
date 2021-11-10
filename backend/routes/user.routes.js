const router= require('express').Router();
const authController= require('../controllers/auth.controllers');
const validatorEmailMdp= require('../middlewares/validatorEmailMdp')

router.post('/register', validatorEmailMdp, authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout)



module.exports= router;