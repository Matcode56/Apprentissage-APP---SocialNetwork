//Import router
const router= require('express').Router();

//Import Controller
const postController= require('../controllers/post.controller');

//Import middlewares
const middlePost= require('../middlewares/post');
const upload= require('../config/upload')

//Posts User
router.get('/', postController.readPost);
router.post('/', upload.single('postImage'), middlePost.checkPosterId,  postController.createPost);
router.put('/:id', middlePost.checkPostId, postController.updatePost);
router.delete('/:id', middlePost.checkPostId, postController.deletePost);
router.patch('/likePost/:id/', middlePost.checkPostId, middlePost.checkIdUser, postController.likePost);
router.patch('/unlikePost/:id', middlePost.checkPostId, middlePost.checkIdUser, postController.unlikePost )

//Commentaire posts
router.patch('/commentPost/:id',middlePost.checkPostId, middlePost.checkIdUser, middlePost.checkDataComment,postController.commentPost);
router.patch('/editComment/:id', middlePost.checkPostId, middlePost.checkIdUser, middlePost.checkComment, postController.editComment);
router.patch('/deleteComment/:id',middlePost.checkPostId, middlePost.checkComment, postController.deleteComment);
module.exports= router;


