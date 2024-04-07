const express = require('express');
const admin = require('../controllers/admin');
const validate = require('../controllers/validator');
const { errorHandler } = require('../middlewares/errors');
const { authorise } = require('../middlewares/auth');
const router = express.Router();
const jwt = require('../middlewares/jwt');

router.use(jwt.verifyToken);

router.post('/getUsers', validate.validateUsers, authorise(),  admin.getUsers);

router.use(errorHandler);


module.exports = router;
