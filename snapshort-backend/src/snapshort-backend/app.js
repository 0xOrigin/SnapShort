'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const { errorHandler } = require('./errorHandlers');
const { jsonResponseMiddleware } = require('./jsonResponse');

const app = express();


app.enable('trust proxy');
app.use(compression());
app.use(helmet());
app.use(hpp());
app.use(
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour.',
    validate: {
      trustProxy: false,
    },
  }),
);

app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use(cors());
app.options('*', cors());

app.use(jsonResponseMiddleware);

// 3) ROUTES
app.use('/', (req, res, next) => {
  res.jsonResponse({
    message: 'Hello from the server side!',
    app: 'Snapshort',
    version: '1.0.0',
  }, 200);
  // next(new Error('This is an error'));
});

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server.`,
  });
});

app.use(errorHandler);

module.exports = app;
