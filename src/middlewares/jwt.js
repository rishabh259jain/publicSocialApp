const User = require('../models/users');
const jwt = require('jsonwebtoken');
const {
  AuthorizationError,
  OperationalError
} = require('../utils/errors');

const sendToken = (req, res) => {
  jwt.sign({ email: req.body.email }, process.env.SECRET, { expiresIn: '86400s' }, (err, token) => {
    if(err) {
      return next(new OperationalError('Could not generate Token'));
    }
    return res.status(200).json({token, role: req.user.role});
  });
};

const verifyToken = async (req, res, next) => {
  let token = null;
  const bearerHeader = req.headers.authorization;
  // check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at space
    const bearer = bearerHeader.split(' ');
    // get token from array
    const bearerToken = bearer[0];
    // set the token
    token = bearerToken;
  } else {
    return next(new AuthorizationError('Did not receive token'));
  }
  
  jwt.verify(token, process.env.SECRET,async (err, decoded) => {
    if(err) {
      return next(new AuthorizationError('Token Invalid. Forbidden!'));
    }
    if (!req.decoded) {
      req.decoded = {};
    }
    let user = await User.findOne({ email: decoded.email }).lean();
    if (!user) return next(new OperationalError('Something went wrong'));
    req.decoded.user = user;
    return next();
  });
};

exports = module.exports = {
  sendToken,
  verifyToken
}