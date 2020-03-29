const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const connection = require('./database/connection');
// const mongoose = require('../../../lib');

// const uri = 'mongodb://localhost/mongoose-shared-connection';
// global.db = mongoose.createConnection(uri);



const app = express();
app.use(bodyParser.json())
app.use('/', require('./routes'));

//serve up static main page
app.use(express.static(path.join(__dirname,'..','client', 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'..','client', 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
// Server code anywhere above here inside connectDB()
