const { db } = require('../../../db/db')

const createTask = async ({ fid, title, description }) => {
    const newTask = await db('tasks').insert({
        title,
        description,
        fid
    }).returning('*')

    return newTask
}

// Checks if flow already has task with duplicate title
const getTitleByFid = async ({ fid, title }) => {
    const tasks = await db('tasks').where({ fid, title }).select('*')
    return tasks
}

const checkTaskValidity = async ({tid, fid}) => {
    return await db('tasks').where({tid, fid}).select("*")
}

const deleteTaskByTid = async ({tid}) => {
    return await db('tasks').where({tid}).del().returning("*")
}

module.exports = {
    createTask,
    getTitleByFid,
    checkTaskValidity,
    deleteTaskByTid
}