const mongoose = require('mongoose');
const winston = require('winston');

// Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    winston.info('database connected successfully');
  })
  .catch((err) => {
    winston.error(err);
  });

mongoose.connection.on('error', (err) => {
  winston.error(err);
  winston.info('%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});