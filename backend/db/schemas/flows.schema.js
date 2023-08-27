const flowSchema = (table) => {
  table.increments('fid');
  table.string('title').notNullable();
  table.string('description');
  table.string('dataset_s3_key');
  table.timestamps(true, true);
};

module.exports = flowSchema;
