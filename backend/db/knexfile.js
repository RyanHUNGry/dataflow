require('dotenv').config()

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.PG_DEV_DATABASE_URI,
      // Do not reject RDS SSL certificate as development application does have have its own SSL certificate
      // Tools such as PSQL and PgAdmin have their own SSL certificate used to secure connection with RDS
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
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
