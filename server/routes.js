const express = require('express')
const api = express.Router();

api.get('/board', (req,res)=>{
    res.send('board')
})

module.exports = api;