const userSchema = table => {
    table.increments('uid')
    table.string('password').notNullable()
    table.string('email').notNullable().unique()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.timestamps(true, true)
}

module.exports = userSchema
