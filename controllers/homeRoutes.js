const router = require('express').Router();
const session = require('express-session');
const { Post, User } = require('../models');
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

router.get("/login", (req, res) => {
    res.render('login');
});

router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get('/post/:id', async (req, res) => {
    try{ 
        const postData = await Post.findByPk(req.params.id);
        if(!postData) {
            res.status(404).json({message: 'No post with this id!'});
            return;
        }
        const posts = postData.get({ plain: true });

        res.render('post', {
            posts
        });
      } catch (err) {
          res.status(500).json(err);
      };     
  });

module.exports = router;