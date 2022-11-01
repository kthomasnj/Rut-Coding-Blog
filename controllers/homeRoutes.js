const router = require('express').Router();
const session = require('express-session');
const { Post, Comments, User } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {

    const postData = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    });

    const posts = postData.map((posts) => posts.get({ plain: true }));

    res.render('homepage', {
        posts: posts,
        logged_in: req.session.logged_in
    });
});

router.get("/create", withAuth, async (req, res) => {
    const currentUser = await User.findByPk(req.session.user_id);

    const loggedInperson = currentUser.dataValues.name;

    res.render('create', {
        logged_in: req.session.logged_in,
        loggedInUser: loggedInperson
    })
});

router.get("/dashboard", withAuth, async (req, res) => {
    const currentUser = await User.findByPk(req.session.user_id);

    const loggedInperson = currentUser.dataValues.name;

    const postData = await Post.findAll({
        where: { author: loggedInperson },
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    });

    const posts = postData.map((posts) => posts.get({ plain: true }));

    res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in,
        loggedInUser: loggedInperson
    });
});

router.get("/login", (req, res) => res.render('login'));

router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get("/post/:id", (req, res) => {
//     Post.findByPk(req.params.id,
//         { 
//             include: [
//                 User, { 
//                     model: Comments,                     
//                 },
//             ], 
//         })
//         .then((dbPostData) => {
//             console.log(`DB Post Data: `, dbPostData);

//             if (dbPostData) {
//                 const post = dbPostData.get({ plain: true });
//                 res.render("post", { post });
//             }
//             else { res.status(404).end(); }
//         })
        
//         .catch((err) =>  { console.log(err)
//             res.status(500).json(err); });
// });

router.get('/post/:id', withAuth, async (req, res) => {
        const postData = await Post.findByPk(req.params.id,
                    { 
                        include: [
                            User, { 
                                model: Comments,                     
                            },
                        ], 
                    })

        if(!postData) {
            res.status(404).json({message: 'No post with this id!'});
            return;
        }
        const posts = postData.get({ plain: true });

        console.log(`Post Data: `, postData.dataValues.comments.[0]);

        res.render('post', {
            posts,
            logged_in: req.session.logged_in
        });     
  });

router.get('/edit/:id', async (req, res) => {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
        res.status(404).json({ message: 'No post with this id!' });
        return;
    }

    const posts = postData.get({ plain: true });

    res.render('edit', {
        posts,
        logged_in: req.session.logged_in
    });
}
);

module.exports = router;