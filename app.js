const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const expressWinston = require('express-winston');
const csrf = require('csurf');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const errHndlr = require('./src/utils/errors');
require('winston-daily-rotate-file');
require('dotenv').config();
// mongodb config
require('./config/db');

// require routes
const index = require('./src/routes/index');

// Initializing express app
const app = express();

// Adds helmet middleware
app.use(helmet());

//Etag disable
app.set('etag', false);

//Body Parser Configuration
app.use(bodyParser.json({ // to support JSON-encoded bodies
  limit: '1mb'
}));

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  limit: '1mb',
  extended: true
}));

// Using CORS
app.use(cors());
app.options('*', cors());

//Rate Limit for API
app.enable('trust proxy');  // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc

const limiter = new rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

//  apply to all requests
app.use(limiter);

// winston Configuration
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
expressWinston.bodyBlacklist.push('password', 'pin');
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.DailyRotateFile)({
      dirname: './logs',
      filename: 'access-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '1d'
    })]
}));

// express-seeeions config
app.use(session({
  secret: 'My super session secret',
  cookie: {
    httpOnly: true,
    secure: true,
  },
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// csurf config
// app.use(csrf({ cookie: true }));

// Router Initialization

app.get('/',(req, res) => {
  res.status(200).json({
    msg: 'Welcome to voosh technologies'
  });
});

app.use('/', index);


module.exports = app;