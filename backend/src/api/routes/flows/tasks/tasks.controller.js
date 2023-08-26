const flowsModel = require('../../../models/flows.model');
const tasksModel = require('../../../models/tasks.model');

/**
 * @private
 * POST /flows/tasks
 * Creates a new task for a flow.
 *
 * This endpoint creates a new task for a given flow. The flow must exist in the database and
 * the user requesting creation must have ownership of the flow.
 *
 * @params {object} req.body - task information
 *  - fid, title, description
 *
 * @return {object} The new task.
 *
 * @throws {400} - If fields are missing.
 * @throws {400} - If flow does not exist or user does not own flow.
 * @throws {400} - If task title is not unique for a given flow.
 */
const createTask = async (req, res) => {
  const uid = req.user;
  const data = {...req.body};
  const {fid, title, description} = data;

  if (!fid || !title || !description) {
    return res.status(400).json({error: 'Please specify all fields'});
  }

  // Check if flow exists and user has ownership of that flow
  const doesUserOwnFlow = (await flowsModel.checkFlowValidity({uid, fid})).length !== 0;
  if (!doesUserOwnFlow) {
    return res.status(400).json({error: 'Invalid flow'});
  }

  // Check if task title is duplicated in the same flow - doesn't make sense to have same tasks in same flow
  const doesTaskExist = (await tasksModel.getTitleByFid({fid, title})).length !== 0;
  if (doesTaskExist) {
    return res.status(400).json({error: 'Task already exists in this flow'});
  }

  const newTask = await tasksModel.createTask(data);
  return res.status(201).json(newTask);
};

const deleteTask = async (req, res) => {
  const uid = req.user;
  const data = {...req.body};
  const {tid, fid} = data;

  if (!tid || !fid) {
    return res.status(400).json({error: 'Please specify all fields'});
  }

  // Check if flow exists and user has ownership of that flow
  const doesUserOwnFlow = (await flowsModel.checkFlowValidity({uid, fid})).length !== 0;
  if (!doesUserOwnFlow) {
    return res.status(400).json({error: 'Invalid flow'});
  }

  // Check if task exists and flow has ownership of that task
  const doesTaskBelongToFlow = (await tasksModel.checkTaskValidity({tid, fid})).length !== 0;
  if (!doesTaskBelongToFlow) {
    return res.status(400).json({error: 'Invalid task'});
  }

  const deletedTask = await tasksModel.deleteTaskByTid({tid});
  return res.status(200).json(deletedTask);
};

module.exports = {
  createTask,
  deleteTask,
};
