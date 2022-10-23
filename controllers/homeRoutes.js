const router = require('express').Router();
const session = require('express-session');
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {

        const postData = await Blog.findAll({
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
    
    const postData = await Blog.findAll({
        // Where: { id: req.session.author },
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
            logged_in: req.session.logged_in
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

module.exports = router;