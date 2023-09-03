const refreshTokenSchema = (table) => {
  table.integer('uid').notNullable().unique();
  table.increments('rtid');
  table.string('refresh_token').notNullable();
  table.timestamps(true, true);
};

module.exports = refreshTokenSchema;
