const taskSchema = table => {
    table.increments('tid')
    table.integer('fid')
    table.foreign('fid').references('flows.fid')
    table.string('title').notNullable()
    table.string('description')
    table.timestamps(true, true)
}

module.exports = taskSchema
