const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middlewares/errors');
const users = require('./users');
const admin = require('./admin');

router.use('/users', users);
router.use('/admin', admin);

router.use(errorHandler);

module.exports = router;