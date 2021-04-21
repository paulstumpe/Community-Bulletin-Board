var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/communityForum', {useNewUrlParser: true,  useUnifiedTopology: true })
.then(() => console.log('Connected to database'))
.catch(err => console.error('Failed to connect to database', err));

const postSchema = new mongoose.Schema({
    // TODO: your schema here!
    title: {
        type: String,
        default:''
    },
    body: {
        type: String,
        default:''
    },
    upVotes: {
        type: Number,
        default: 1
    },
    tags: Array,
    dateCreated: {
        type: Date,
        default : Date.now
    },
    dateUpdated:{
        type: Date,
        default : Date.now
    },
  });

const Post = mongoose.model('Post', postSchema);

const savePost = (submittedPost)=>{
    const post = new Post(submittedPost);
    return post.save();
};

const deletePost = (_id)=>{
    return Post.deleteOne({_id});
};

const editPost = (submittedPost)=>{
    const {_id}=submittedPost;
    //updates date updated serverside for consistency and protection
    submittedPost.dateUpdated = Date.now();
    //looks up post by id and rewrites with submittedPost
    console.log(_id);
    return Post.findOneAndUpdate({_id}, {$set:submittedPost},{
        new:true,
        useFindAndModify:false
    }).then((x)=>{console.log(x);});
};

const getAllPosts = ()=>{
    return Post.find({});
};
const getAllTags = ()=>{
    return  Post.find(()=>{}).select('tags');
}

const upVotePost = (_id)=>{
    return Post.findOneAndUpdate({_id},{$inc:{upVotes: 1}});
};

const downVotePost = (_id)=>{
    return Post.findOneAndUpdate({_id},{$inc:{upVotes: -1}});
};


// savePost({title:'this one has two upvotes', upVotes: 0,body: 'and this  body is super long asl;kdnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnfa see?', tags:["i'm trolling"]})
getAllPosts();
module.exports = {savePost, deletePost, editPost, getAllPosts, upVotePost, downVotePost, getAllTags};