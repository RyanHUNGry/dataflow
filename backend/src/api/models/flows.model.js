const { db } = require('../../../db/dev_db');

// Adds a new flow in flows table
const createFlow = async ({ title, description }) => {
    const newFlow = await db('flows').insert({
        title,
        description
    }).returning('*')

    return newFlow
}

// Gets all flows that a user owns
const getFlowsByUid = async ({ uid }) => {
    return await db('flows_and_users').where({ uid }).join('flows', 'flows.fid', 'flows_and_users.fid').select("*")
}

// Adds a new ownership in flows-to-users assignment table
const assignFlowOwnership = async ({ uid, fid }) => {
    await db('flows_and_users').insert({
        uid,
        fid
    })
}

// Checks if flow exists and a user has ownership of that flow
const checkFlowValidity = async ({ uid, fid }) => {
    return await db('flows_and_users').where({ uid, fid }).select('*')
}

// Checks if user already has flow with duplicate title
const getTitleByUid = async ({ uid, title }) => {
    const flows = await db('flows_and_users').where({ uid }).join('flows', 'flows.fid', 'flows_and_users.fid').where({title}).select('*')
    return flows
}

module.exports = {
    createFlow,
    getTitleByUid,
    assignFlowOwnership,
    getFlowsByUid,
    checkFlowValidity
}