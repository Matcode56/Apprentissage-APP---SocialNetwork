const router= require('express').Router();
const authController= require('../controllers/auth.controllers');
const validatorEmailMdp= require('../middlewares/validatorEmailMdp')
const userController= require('../controllers/user.controllers');
const checkPswUpdate= require('../middlewares/checkPswUpdate')

// authentification
router.post('/register', validatorEmailMdp,authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout)

// get and modification user
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getInfosUser);
router.put("/:id", userController.updateUser);
router.put("/:id/psw", checkPswUpdate, userController.updateMdp);
router.delete("/:id", userController.deleteUser);
router.patch("/:id/follow", userController.follow);
router.patch("/:id/unfollow", userController.unfollow);

module.exports= router;