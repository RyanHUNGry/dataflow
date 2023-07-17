const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')

// Use this config to specify seed quantities
const config = {
    NUM_USERS: 21,
    NUM_TASKS: 8,
    NUM_FLOWS: 17, // Must be > 0
    NUM_OWNERSHIP: 200 // Number of users assigned to flows and <- NUM_USERS * NUM_FLOWS
}

const generateUsers = async () => {
    const PASSWORD = '123' // all fake users will have the same password
    const saltRounds = 8
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(PASSWORD, salt);

    return Array.from({length: config.NUM_USERS}).map(() => {
        return {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            password: hash,
            email: faker.internet.email()
        }
    })
}

const generateFlows = () => {
    return Array.from({length: config.NUM_FLOWS}).map(() => {
        return {
            title: faker.company.buzzVerb(),
            description: faker.company.buzzPhrase()
        }
    })
}

const generateFlowOwnerships = () => {
    const chosenSet = new Set()
    const res = []
    let i = 0
    while (i < config.NUM_OWNERSHIP) {
        const flow_id = Math.floor(Math.random() * config.NUM_FLOWS) + 1; // Flow Ids go from 1 through NUM_FLOWS inclusive
        const user_id = Math.floor(Math.random() * config.NUM_USERS) + 1;

        const ownership = [user_id, flow_id]
        if (!chosenSet.has(JSON.stringify(ownership))) {
            i += 1
            chosenSet.add(JSON.stringify(ownership))
            res.push({
                uid: user_id,
                fid: flow_id
            })
        }
    }

    return res
}

const generateTasks = () => {
    return Array.from({length: config.NUM_TASKS}).map(() => {
        return {
            fid: Math.floor(Math.random() * config.NUM_FLOWS) + 1,
            title: faker.company.buzzVerb(),
            description: faker.company.buzzPhrase()
        }
    })
}

module.exports = {
    generateFlowOwnerships,
    generateFlows,
    generateTasks,
    generateUsers
}