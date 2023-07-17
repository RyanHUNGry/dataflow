const { generateFlows } = require("../../../util/generate");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('flows').del()
  await knex('flows').insert(generateFlows());
};
