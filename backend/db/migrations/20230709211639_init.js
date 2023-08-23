const userSchema = require("../schemas/users.schema");

// Moves forward in migration
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', userSchema)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Moves back in migration
exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
