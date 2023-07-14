const flowsModel = require('../../../models/flows.model')
const tasksModel = require('../../../models/tasks.model')

const createTask = async (req, res) => {
    const uid = req.user
    const data = {...req.body}
    const { fid, title, description } = data

    if (!fid || !title || !description) {
        return res.status(400).json({ error: "Please specify all fields" })
    }

    // Check if flow exists and user has ownership of that flow
    const doesUserOwnFlow = (await flowsModel.checkFlowValidity({ uid, fid })).length !== 0
    if (!doesUserOwnFlow) {
        return res.status(400).json({ error: "Invalid flow" })
    }

    // Check if task title is duplicated in the same flow - doesn't make sense to have same tasks in same flow
    const doesTaskExist = (await tasksModel.getTitleByFid({ fid, title })).length !== 0
    if (doesTaskExist) { 
        return res.status(400).json({error: "Task already exists in this flow"})
    }

    const newTask = await tasksModel.createTask(data)
    return res.status(201).json(newTask)
}

module.exports = {
    createTask
}