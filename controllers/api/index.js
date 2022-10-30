const router = require('express').Router();

const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

router.use('/create', postRoutes);
router.use('/users', userRoutes);

module.exports = router;