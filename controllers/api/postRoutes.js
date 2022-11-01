const router = require('express').Router();
const Post = require('../../models/post');
const withAuth = require('../../utils/auth');

router.post('/create', async (req, res) => {  
    console.log('Server received create data!!');  
        const post = await Post.create(
            {
                title: req.body.title,
                postText: req.body.postText,
                author: req.body.author
            });
        res.status(200).json(post);    
});

router.delete('/delete/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this ID!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/update/:id', withAuth, async (req, res) => {
    console.log(`req.body: `, req.body);
    console.log(`req.params.id: `, req.params.id);
    const updatedPost = Post.update(
        {
            title: req.body.title,
            textContent: req.body.textContent,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )

    res.json(updatedPost);
});

module.exports = router;