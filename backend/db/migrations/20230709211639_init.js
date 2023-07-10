const userSchema = require("../schemas/users.schema");

// Moves forward in migration
// exports.up is equivalent to module.exports = {up: ...}
exports.up = function(knex) {
    return knex.schema.createTable('users', userSchema)
};

// Moves back in migration
exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
