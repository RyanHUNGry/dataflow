const usersModel = require('../../models/users.model')

const getAllUsers = (req, res) => {
    res.status(200).json({ user: 1 })
}

const createUser = async (req, res) => {
    // Probabaly want more input validation
    const data = req.body
    const { email, firstName, lastName } = data

    if (!email || ! firstName || !lastName) {
        return res.status(400).json({error: "Please specify all fields"})
    }

    const doesUserExist = (await usersModel.getUserByEmail(email)).length !== 0
    if (doesUserExist) {
        return res.status(400).json({error: "Email already in use"})
    }

    const newUser = await usersModel.createUser(data)
    return res.status(201).json(newUser)
}

module.exports = {
    getAllUsers,
    createUser
}