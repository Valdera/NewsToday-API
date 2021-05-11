const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const lineController = require('./lineController');

const app = express();

// Security HTTP Headers
app.use(helmet());

app.use(morgan('dev'));

// Limit Request from same IP
const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour'
});

app.use('/api', limiter);

// Body parser, reading data from the body into req.body
app.use(
  express.json({
    limit: '10kb'
  })
);

// Data sanitation againts XSS
app.use(xss());

// Allow cross origin sites
app.use(cors());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: []
  })
);

app.get('/line', lineController.today);

module.exports = app;
