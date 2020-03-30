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
api.delete('/deletepost/:postId',(req,res)=>{
    deletePost(req.params.postId)
    .then(()=>res.send('post deleted'))
})
api.patch('/upvote/:postId',(req, res)=>{
    upVotePost(req.params.postId)
    .then(()=>res.send('post upvoted'))    
})
api.patch('/downvote/:postId',(req, res)=>{
    downVotePost(req.params.postId)
    .then(()=>res.send('post downVoted'))    
})
api.patch('/editpost',(req, res)=>{
    console.log(req.body)
    editPost(req.body)
    .then(()=>res.send('post edited'))    
})

module.exports = api;