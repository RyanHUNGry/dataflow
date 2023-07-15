const { db } = require('../../../db/db')

const createUser = async ({ email, firstName, lastName, password }) => {
    const [ newUser ] = await db('users').insert({
        email,
        first_name: firstName,
        last_name: lastName,
        password
    }).returning('*')

    return newUser
}

const getUserByEmail = async (email) => {
    const [ user ] = await db('users').where({ email }).select("*")
    return user 
}


const getUserByUid = async (uid) => {
    return await db('users').where({ uid }).select("*")
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserByUid
}
