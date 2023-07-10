const flowSchema = require("../schemas/flows.schema");
const flowAndUser = require("../schemas/flowsAndUsers.Schema");
const taskSchema = require("../schemas/tasks.schema");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('flows', flowSchema)
    .createTable('tasks', taskSchema)
    .createTable('flows_and_users', flowAndUser)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tasks')
    .dropTable('flows_and_users')
    .dropTable('flows')
};
