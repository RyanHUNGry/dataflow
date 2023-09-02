const path = require('path');
const fs = require('fs');

require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.PG_DEV_DATABASE_URI,
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
      database: process.env.PG_TEST_DATABASE,
      user: process.env.PG_TEST_USERNAME,
      password: process.env.PG_TEST_PASSWORD,
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
      database: process.env.PG_PROD_DATABASE,
      user: process.env.PG_PROD_USERNAME,
      password: process.env.PG_PROD_PASSWORD,
      host: process.env.PG_PROD_HOST,
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
