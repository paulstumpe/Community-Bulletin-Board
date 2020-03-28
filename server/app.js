// Load MongoDB utils
const MongoDB = require('./database/connection')
// Load queries & mutations
const Users = require('./database/helpers')

// Improve debugging
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason)
})

const seedUser = {
    name: 'Bob Alice',
    email: 'test@dev.null',
    bonusSetting: true
}

// Connect to MongoDB and put server instantiation code inside
// because we start the connection first
MongoDB.connectDB(async (err) => {
    if (err) throw err
    // Load db & collections
    const db = MongoDB.getDB()
    const users = db.collection('users')

    try {
        // Run some sample operations
        // and pass users collection into models
        const newUser = await Users.createUser(users, seedUser)
        const listUsers = await Users.getUsers(users)
        const findUser = await Users.findUserById(users, newUser._id)

        console.log('CREATE USER')
        console.log(newUser)
        console.log('GET ALL USERS')
        console.log(listUsers)
        console.log('FIND USER')
        console.log(findUser)
    } catch (e) {
        throw e
    }

    const desired = false
    if (desired) {
        // Use disconnectDB for clean driver disconnect
        MongoDB.disconnectDB()
        process.exit(0)
    }
    // Server code anywhere above here inside connectDB()
    
    const express = require('express');
    const bodyParser = require('body-parser')
    const path = require('path');
    const app = express();


    app.use('/', require('./routes'));
    app.use(express.static(path.join(__dirname,'..','client', 'build')));


    app.get('/ping', function (req, res) {
    return res.send('pong');
    });

    app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname,'..','client', 'build', 'index.html'));
    });

    app.listen(process.env.PORT || 8080);

})


