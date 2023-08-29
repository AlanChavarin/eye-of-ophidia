const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const Fixtures = require('node-mongodb-fixtures')

let mongod, uri

const fixtures = new Fixtures({
    dir: 'backend/fixtures',
    mute: true,
})

const connect = async () => {
    mongod = await MongoMemoryServer.create()
    uri = mongod.getUri()

    const mongooseOpts = {
        useNewUrlParser: true,
    }

    await mongoose.connect(uri, mongooseOpts)
    await fixtures.connect(uri)
}

const closeDatabase = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
    await fixtures.disconnect()
}

const seedDatabase = async () => {
    await fixtures.load()
}

const clearDatabase = async () => {
    const collections = mongoose.connection.collections

    for (const key in collections) {
        const collection = collections[key]
        await collection.deleteMany()
    }
}

module.exports = {
    connect,
    closeDatabase,
    clearDatabase,
    seedDatabase
}