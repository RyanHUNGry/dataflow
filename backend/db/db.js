require('dotenv').config({ path: '../.env' })

const knex = require('knex')

const knexfile = require('./knexfile')[process.env.NODE_ENV]

const connectToDatabase = () => {
    return knex(knexfile);
}

const testDatabaseConnection = async (db) => {
    try {
        await db.raw("SELECT 1")
        console.log("✅ Database activated") 
    } catch (err) {
        console.log("❌ Database inactivated", err)
    }
}

const db = connectToDatabase();

module.exports = { testDatabaseConnection, db };
