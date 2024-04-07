const {
  ValidateCreateUser,
  ValidateProfile,
  ValidateLogin,
  ValidateSocialLogin,
  ValidateEmailArray
} = require('../../config/validatorSchema');

const {
  ValidationError
} = require('../utils/errors');

const createUser = (req, res, next) => {
  const {error, value} = ValidateCreateUser.validate(req.body);
  if(error) {
    return next(new ValidationError(error.details && error.details[0].message ?error.details[0].message:'Inputs do not meet criteria'));
  }
  return next();
};


const updateProfile = (req, res, next) => {
  const {error, value} = ValidateProfile.validate(req.body);
  if(error) {
    return next(new ValidationError(error.details && error.details[0].message ?error.details[0].message:'Inputs do not meet criteria'));
  }
  return next();
};

const login = (req, res, next) => {
  const {error, value} = ValidateLogin.validate(req.body);
  if(error) {
    return next(new ValidationError(error.details && error.details[0].message ?error.details[0].message:'Inputs do not meet criteria'));
  }
  return next();
};

const socialLogin = (req, res, next) => {
  const {error, value} = ValidateSocialLogin.validate(req.body);
  if(error) {
    return next(new ValidationError(error.details && error.details[0].message ?error.details[0].message:'Inputs do not meet criteria'));
  }
  return next();
};

const validateUsers = (req, res, next) => {
  const {error, value} = ValidateEmailArray.validate(req.body);
  if(error) {
    return next(new ValidationError(error.details && error.details[0].message ?error.details[0].message:'Inputs do not meet criteria'));
  }
  return next();
};

exports = module.exports = {
  createUser,
  login,
  updateProfile,
  socialLogin,
  validateUsers
};