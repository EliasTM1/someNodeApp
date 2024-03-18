const {MongoClient} = require('mongodb')

let dbConnection;

let uri = 'mongodb://0.0.0.0:27017/dbNxtWave'

module.exports = {
    connectToDB: (callback) => {
        MongoClient.connect(uri)
        .then(client => {
            dbConnection = client.db()
            return callback()
        })
        .catch((error) => {
            return callback(error)
        })
    },
    getDb: () => dbConnection
}