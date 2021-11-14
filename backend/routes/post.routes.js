const router= require('express').Router();
const postController= require('../controllers/post.controller');
const middlePost= require('../middlewares/post')

router.get('/', postController.readPost);
router.post('/', middlePost.checkPosterId, postController.createPost);
router.put('/:id', middlePost.checkPostId, postController.updatePost);
router.delete('/:id', middlePost.checkPostId, postController.deletePost);

module.exports= router;