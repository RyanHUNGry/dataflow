const { db } = require('../../../db/db')

const createUser = async ({ email, firstName, lastName }) => {
    const newUser = await db('users').insert({
        email,
        first_name: firstName,
        last_name: lastName
    }).returning('*')

    return newUser
}

const getUserByEmail = async (email) => {
    return await db('users').where({ email }).select("*")
}

module.exports = {
    createUser,
    getUserByEmail
}