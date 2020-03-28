const MongoClient = require('mongodb').MongoClient
 const uri = 'mongodb://localhost:27017/myproject'
 let _db;
 let _client;
 const connectDB = async (callback) => {
     try {
         MongoClient.connect(uri, (err, client) => {
            _client = client;
            const db = client.db('forum')
             _db = db
             return callback(err)
         })
     } catch (e) {
         throw e
     }
 }

 const getDB = () => _db

 const disconnectDB = () => _client.close()

 module.exports = { connectDB, getDB, disconnectDB }