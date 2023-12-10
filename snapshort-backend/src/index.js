'use strict';

const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../../.env'), debug: true });
const {
  app,
  db,
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
  handleSIGTERM,
} = require('./snapshort-backend');

const PORT = process.env.PORT || 3000;


const server = app.listen(PORT, () => {
  console.log(`[+] Server is running on port ${PORT}...`);
});

process.on('uncaughtException', async(err) => await uncaughtExceptionHandler(err, server));
process.on('unhandledRejection', async(err) => await unhandledRejectionHandler(err, server));
process.on('SIGTERM', () => handleSIGTERM(server));
