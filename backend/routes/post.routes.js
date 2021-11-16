const router= require('express').Router();
const postController= require('../controllers/post.controller');
const middlePost= require('../middlewares/post')

router.get('/', postController.readPost);
router.post('/', middlePost.checkPosterId, postController.createPost);
router.put('/:id', middlePost.checkPostId, postController.updatePost);
router.delete('/:id', middlePost.checkPostId, postController.deletePost);
router.patch('/likePost/:id/', middlePost.checkPostId, middlePost.checkIdUser, postController.likePost);
router.patch('/unlikePost/:id', middlePost.checkPostId, middlePost.checkIdUser, postController.unlikePost )

//comments
router.patch('/commentPost/:id',middlePost.checkPostId, middlePost.checkIdUser, middlePost.checkDataComment,postController.commentPost);
router.patch('/editComment/:id', middlePost.checkPostId, middlePost.checkIdUser, middlePost.checkComment, postController.editComment);
router.patch('/deleteComment/:id',middlePost.checkPostId, middlePost.checkComment, postController.deleteComment);
module.exports= router;