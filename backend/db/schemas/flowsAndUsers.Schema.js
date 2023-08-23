const flowAndUser = table => {
    table.integer('uid')
    table.integer('fid')
    table.primary(['uid', 'fid'])
    table.foreign('uid').references('users.uid')
    table.foreign('fid').references('flows.fid')
    table.timestamps(true, true)
}

module.exports = flowAndUser
