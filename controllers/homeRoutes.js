const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get("/", (req, res) => {
    res.render('homepage');
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