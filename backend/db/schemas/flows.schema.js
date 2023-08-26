const flowSchema = (table) => {
  table.increments('fid');
  table.string('title').notNullable();
  table.string('description');
  table.timestamps(true, true);
};

module.exports = flowSchema;
