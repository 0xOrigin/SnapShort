'use strict';

const dotenv = require('dotenv').config({ path: '.env', override: true });
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


db.authenticate()
  .then(() => {
    console.log('[+] Database connected...');
  })
  .catch((err) => {
    console.log('Error: ' + err);
    console.log('[!] Database connection failed...');
    server.close(() => {
      console.log('[!] Server closed...');
    });
  });
