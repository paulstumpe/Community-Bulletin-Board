const ObjectID = require('mongodb').ObjectID

// Notice how the users collection is passed into the models
const createUser = async (users, user) => {
    try {
        const results = await users.insertOne(user)
        return results.ops[0]
    } catch (e) {
        throw e
    }
}

const getUsers = async (users) => {
    try {
        const results = await users.find().toArray()
        return results
    } catch (e) {
        throw e
    }
}

const findUserById = async (users, id) => {
    try {
        if (!ObjectID.isValid(id)) throw 'Invalid MongoDB ID.'
        const results = await users.findOne(ObjectID(id))
        return results
    } catch (e) {
        throw e
    }
}

// Export garbage as methods on the Users object
module.exports = { createUser, getUsers, findUserById }