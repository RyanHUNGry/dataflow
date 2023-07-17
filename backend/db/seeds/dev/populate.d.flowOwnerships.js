const { generateFlowOwnerships } = require("../../../util/generate");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    await knex('flows_and_users').del()
    await knex('flows_and_users').insert(generateFlowOwnerships);
  };
  