'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const { jsonResponseMiddleware } = require('./jsonResponse');
const {
  AppError,
  errorHandlerMiddleware,
  nonOperationalErrorHandlerMiddleware
} = require('./errorHandlers');

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
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(errorHandlerMiddleware);
app.use(nonOperationalErrorHandlerMiddleware);


module.exports = app;
