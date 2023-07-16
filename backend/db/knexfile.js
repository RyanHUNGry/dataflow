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
    }
  },
};
