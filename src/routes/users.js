const express = require('express');
const user = require('../controllers/users');
const validate = require('../controllers/validator');
const router = express.Router();
const jwt = require('../middlewares/jwt');


router.post('/login', validate.login, user.login, jwt.sendToken);
router.post('socialLogin', validate.socialLogin, user.socialLogin, jwt.sendToken);
router.post('/register', user.register);

router.use(jwt.verifyToken);

router.post('/', user.getUser);
router.post('/uploadProfile', user.uploadProfile);
router.post('/getProfiles', user.getProfiles);
router.post('/changePrivacy', user.changePrivacy);

module.exports = router;


// register,
// login,
// uploadProfile,
// socialLogin,
// changePrivacy,
// getProfiles,
// getUser,
