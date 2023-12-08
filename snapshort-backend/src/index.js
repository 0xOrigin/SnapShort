'use strict';

const dotenv = require('dotenv').config({ path: '.env', override: true });
const app = require('./snapshort-backend/app');
const { db } = require('./snapshort-backend/config');

const PORT = process.env.PORT || 3000;

process.on('uncaughtException', (err) => {
  console.log('[!] UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`[+] Server is running on port ${PORT}...`);
});

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

process.on('unhandledRejection', (err) => {
  console.log('[!] UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    console.log('[!] Server closed...');
  });
});

process.on('SIGTERM', () => {
  console.log('[!] SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('[+] Process terminated!');
  });
});
