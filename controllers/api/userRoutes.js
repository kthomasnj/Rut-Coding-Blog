const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {

    const currentUser = req.body.name;
  
    const userData = await User.create(req.body);
  
  req.session.save(() => {
    req.session.logged_in = true;      
    const currentUser = userData.name;
    
      res.render('dashboard',{
        logged_in: req.session.logged_in,
        loggedInUser: currentUser
      });
    });
  
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Your email or password is incorrect.' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Your email or password is incorrect.' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.render('dashboard',{logged_in: req.session.logged_in});
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/', async (req, res) => {

  const userData = await User.findOne({ where: { id: req.session.user_id } });
  const name=userData.dataValues.name;

  console.log(name);
  
  try {
    res.status(200).send(name);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;