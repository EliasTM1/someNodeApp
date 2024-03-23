// * Connection with mongoose
const mongoose = require('mongoose');

let dbConnection;

let uri = 'mongodb://0.0.0.0:27017/dbNxtWave';

module.exports = {
    connectToDB: (callback) => {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('Connected to MongoDB');
            dbConnection = mongoose.connection;
            return callback();
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
            return callback(error);
        });
    },
    getDb: () => dbConnection
};

// * Regular mongo DB connection
// const {MongoClient} = require('mongodb')

// let dbConnection;

// let uri = 'mongodb://0.0.0.0:27017/dbNxtWave'

// module.exports = {
//     connectToDB: (callback) => {
//         MongoClient.connect(uri)
//         .then(client => {
//             dbConnection = client.db()
//             return callback()
//         })
//         .catch((error) => {
//             return callback(error)
//         })
//     },
//     getDb: () => dbConnection
// }