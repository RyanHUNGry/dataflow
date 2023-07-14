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

module.exports = {
    createTask,
    getTitleByFid
}