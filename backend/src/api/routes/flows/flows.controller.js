const flowsModel = require('../../models/flows.model')

const getAllFlows = async (req, res) => {
    const uid = req.user
    const flows = await flowsModel.getFlowsByUid({ uid })
    res.status(200).json(flows)
}

/**
 * @private
 * POST /flows
 * Creates a new flow for user.
 *
 * This endpoint creates a new flow by inserting entries into both the flow and 
 * flow-to-user assignment tables. The flow is initialized with no tasks.
 *
 * @params {object} req.body - flow information
 *  - title, description
 * 
 * @returns {object} The new flow.
 * 
 * @throws {400} - If fields are missing.
 * @throws {400} - If title is not unique for a user's project.
 */
const createFlow = async (req, res) => {
    const uid = req.user
    const data = req.body
    const { title } = data

    if (!title) {
        return res.status(400).json({ error: "Please specify a title" })
    }

    const doesTitleExist = (await flowsModel.getTitleByUid({ uid, title })).length !== 0

    if (doesTitleExist) {
        return res.status(400).json({ error: "You already have a project with the title" })
    }

    const [newFlow] = await flowsModel.createFlow(data)

    const fid = newFlow.fid
    await flowsModel.assignFlowOwnership({ uid, fid })

    return res.status(201).json(newFlow)
}

const createDataset = async (req, res) => {
    console.log(req.file)
    res.status(200).json('object sent to bucket')
}

module.exports = {
    getAllFlows,
    createFlow,
    createDataset
}
