import React, { useState, useEffect } from 'react';
import CreatePost from './CreatePost';
import {Card, Accordion, Button} from 'react-bootstrap';
import Axios from 'axios';
import moment from 'moment';

const Post = ({post, i, refresh})=>{
    const [upVoting, setUpVoting] = useState(false);
    const [downVoting, setDownVoting] = useState(false);
    const [deleting, setDeleting] = useState(false)
    const handleRemovePost = ()=>{
        setDeleting(true);
        Axios.delete(`deletepost/${post._id}`)
        .then(()=>{
            setDeleting(false);
            refresh();
        })
    }
    const handleUpVote = ()=>{
        if( !downVoting && !upVoting){
            setUpVoting(true);
            setDownVoting(false);
            Axios.patch(`upvote/${post._id}`)
            .then(()=>{
                refresh();
            })
        } else if(upVoting){
            console.log('reached')
            setUpVoting(false);
            Axios.patch(`downvote/${post._id}`)
            .then(()=>{
                refresh();
            })
        } else if(downVoting){
            setUpVoting(true);
            setDownVoting(false);
            Axios.patch(`upvote/${post._id}`)
            .then(()=>{
                return Axios.patch(`upvote/${post._id}`)
            })
            .then(()=>{
                refresh();
            })
        }
    }
    const handleDownVote = ()=>{
        if(!downVoting && !upVoting){
            setUpVoting(false);
            setDownVoting(true);
            Axios.patch(`downvote/${post._id}`)
            .then(()=>{
                refresh();
            })
        }else if (downVoting){
            console.log('reached')
            setDownVoting(false);
            Axios.patch(`upvote/${post._id}`)
            .then(()=>{
                refresh();
            })
        } else if(upVoting){
            setDownVoting(true);
            setUpVoting(false);
            Axios.patch(`downVote/${post._id}`)
            .then(()=>{
                return Axios.patch(`downVote/${post._id}`)
            })
            .then(()=>{
                refresh();
            })
        }
    }
    const enabledStyle = {
        margin:'5px'
    };
    const disabledStyle = {
        margin:'5px',
        opacity: 0.65
    }
    return(
        <Card className='text-left'>
            <Accordion.Toggle as={Card.Header} eventKey={i}>
            <h5>{post.title}</h5>
            <small style={{ 
                textOverflow: "ellipsis",
                overflow: "hidden", 
                height: "30px",
                whiteSpace: "nowrap",
                display:"inline-block",
                width:"100%"

            }}
                >{post.body}</small>
            <br/>
            <small className="text-muted">UpVotes: {post.upVotes}</small>
            <small style={{float:'right'}} className="text-muted" >{moment(post.dateCreated).fromNow()}</small>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={i}>
                <Card>
                    <Card.Body>
                        <Card.Text>{post.body}</Card.Text>
                        
                        <Card.Text>
                            <small className='text-muted'>Tags: {post.tags.length ? post.tags.join(', ') : 'none'}</small>
                        </Card.Text>
                        <div style={{float:'right', textAlign:'right'}} >
                            <CreatePost refresh={refresh} post={post} />
                            <Button 
                                style={{margin:'5px'}}
                                size="sm" 
                                disabled={deleting}
                                onClick={handleRemovePost}
                                >{deleting ? "Removing...":"Remove Post"}</Button>
                        </div>
                        
                        <Button size="sm"  style={upVoting? disabledStyle: enabledStyle}  onClick={handleUpVote}>Upvote</Button>
                        <br />
                        <Button size="sm" style={downVoting? disabledStyle: enabledStyle}  onClick={handleDownVote}>Downvote</Button>
                    </Card.Body>
                </Card>
            </Accordion.Collapse>
        </Card>
    )
}
export default Post;