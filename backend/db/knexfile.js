require('dotenv').config({ path: '../.env' })

// Database connection config
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.PG_DEV_DATABASE,
      user: process.env.PG_DEV_USERNAME,
      password: process.env.PG_DEV_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds/dev'
    }
  },
  test: {
    client: 'postgresql',
    connection: {
      database: process.env.PG_TEST_DATABASE,
      user: process.env.PG_TEST_USERNAME,
      password: process.env.PG_TEST_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds/test' // No seeds in use currently, can use for more involved integration tests
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: process.env.PG_PROD_DATABASE,
      user: process.env.PG_PROD_USERNAME,
      password: process.env.PG_PROD_PASSWORD,
      host: process.env.PG_PROD_HOST
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
  },
};
