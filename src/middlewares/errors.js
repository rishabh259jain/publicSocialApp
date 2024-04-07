const winston = require('winston');

const errorHandler = (error, req, res, next) => {
  winston.error(error.stack);
  const message = error.message || 'Something went wrong';
  let status = null;
  switch(error.name) {
    case 'ValidationError':
      status = 400;
      break;
    case 'PermissionError':
      status = 401;
      break;
    case 'AuthorizationError':
      status = 403;
      break;
    case 'DatabaseError':
      status = 500;
      break;
    case 'NotFoundError':
      status = 404;
      break;
    case 'OperationalError':
      status = 500;
      break;    
    default:
      status = 400;        
  }

  res.status(status).json({ message });
}
exports = module.exports = { errorHandler };