const express = require('express')
const api = express.Router();
const {savePost, deletePost, editPost, getAllPosts, upVotePost, downVotePost} = require('./database/connection')

api.get('/board', (req,res)=>{
    res.send('board')
  
})
api.get('/allposts', (req,res)=>{
    getAllPosts()
    .then(allPosts=>res.send(allPosts))
})
api.post('/createpost', (req,res)=>{
    // console.log(req.body)
    savePost(req.body)
    .then(()=>res.send('success'))
})

module.exports = api;