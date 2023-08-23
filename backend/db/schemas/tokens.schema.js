const refreshTokenSchema = table => {
    table.string('uid').notNullable()
    table.increments('rtid')
    table.string('refresh_token').notNullable()
    table.timestamps(true, true)
}

module.exports = refreshTokenSchema
