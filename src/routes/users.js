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
router.post('/changeProfile', user.changeProfile);
router.post('/logout', (req,res,next)=> res.status(200).json({message: 'Logged out successfully'}));

module.exports = router;


// register,
// login,
// uploadProfile,
// socialLogin,
// changeProfile,
// getProfiles,
// getUser,
