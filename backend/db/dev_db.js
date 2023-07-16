const knex = require('knex')
const knexfile = require('./knexfile')

// When production is ready, make sure to switch env vars
const db = knex(knexfile.development)

// Function to test database connection
const testDbConnection = async (db) => {
    try {
        await db.raw("SELECT 1")
        console.log("✅ Database activated") 
    } catch (err) {
        console.log("✅ Database inactivated", err)
    }
}

module.exports = { testDbConnection, db };
