const path = require('path');
const fs = require('fs');

require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.AWS_RDS_DEV,
      // AWS RDS requires SSL connection if you are using it from a local development environment
      // which means the AWS ssl certificate is required to say you trust them
      // rejectUnauthorized is true by default but specifying is more explicit
      ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(path.join(__dirname, '../certificates/us-west-1-bundle.pem')),
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  test: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.AWS_RDS_TEST,
      // AWS RDS requires SSL connection if you are using it from a local development environment
      // which means the AWS ssl certificate is required to say you trust them
      // rejectUnauthorized is true by default but specifying is more explicit
      ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(path.join(__dirname, '../certificates/us-west-1-bundle.pem')),
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.AWS_RDS_PROD,
      // AWS RDS requires SSL connection if you are using it from a local development environment
      // which means the AWS ssl certificate is required to say you trust them
      // rejectUnauthorized is true by default but specifying is more explicit
      ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(path.join(__dirname, '../certificates/us-west-1-bundle.pem')),
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
