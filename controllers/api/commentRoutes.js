const router = require('express').Router();
const Comment = require('../../models/post');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    console.log(req.body);
    console.log(req.body.commentText);
    try {
        const post = await Comment.create(
            {
                commentText: req.body.commentText,
            });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;