const router = require('express').Router();
const { Posts, User } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
    try {
        const postData = await Posts.findAll({
            include: [
                {
                model: User,
                attributes: ['Name'],
                },
            ],
        });

        const posts = postData.map((project) => this.post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {

    res.render('dashboard', {
      logged_in: true
    });
 
  }
);

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