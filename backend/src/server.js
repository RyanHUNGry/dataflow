require('dotenv').config();

const http = require('http');

const app = require('./app');
const {testDatabaseConnection, db} = require('../db/db');
const {testS3Connection, s3} = require('./configs/s3.config');

const startServer = async () => {
  testDatabaseConnection(db);
  testS3Connection(s3);

  const server = http.createServer(app);
  const PORT = process.env.DEV_PORT || 8000;
  server.listen(PORT, () => {
    console.log(`✅ Server activated on ${PORT}`);
  });
};

startServer();
