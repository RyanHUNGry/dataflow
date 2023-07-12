// Create single flow POST
// Delete flow DELETE
// Update flow UPDATE
// GET flow



const getAllFlows = (req, res) => {
    console.log(req.user)
    res.status(200).json({flow: 1})
}

const createFlow = async (req, res) => {
    const data = req.body
    const { title } = data

    if (!title) {
        return res.status(400).json({error: "Please specify a title"})
    }

    const doesUserExist = (await usersModel.getUserByEmail(email)).length !== 0
    if (doesUserExist) {
        return res.status(400).json({error: "Email already in use"})
    }
    
    const newFlow = await usersModel.createUser(data)
    return res.status(201).json(newUser)
}

module.exports = {
    getAllFlows
}