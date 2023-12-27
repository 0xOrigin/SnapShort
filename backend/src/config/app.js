'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const router = require('./routes');
const { jsonResponseMiddleware } = require('./json-response');
const {
  errorHandlerMiddleware,
  nonOperationalErrorHandlerMiddleware
} = require('./error-handlers');


const app = express();

// 1) GLOBAL MIDDLEWARES
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
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

app.use(cors({
  credentials: true,
}));
app.options('*', cors());

app.use(jsonResponseMiddleware);

// 3) MOUNTING ROUTERS
app.use('', router);


// 4) ERROR HANDLING
app.use(errorHandlerMiddleware);
app.use(nonOperationalErrorHandlerMiddleware);


module.exports.app = app;
