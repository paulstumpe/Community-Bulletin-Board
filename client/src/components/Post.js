import React, { useState, useEffect } from 'react';
import PostView from './PostView';
import {Card, Accordion, Button} from 'react-bootstrap';

const Post = ({post, i})=>{
   
    // A single Post has 
    // upvote
    // downvote buttons, 
    // tags, 
    // edit button
    // title 
    // body 
    // date
    console.log(post.tags)
    return(
        <Card className='text-left'>
            <Accordion.Toggle as={Card.Header} eventKey={i}>
            {post.title}
            <small style={{float:'right'}} className="text-muted" >{post.dateCreated}</small>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={i}>
                <Card>
                    <Card.Body>
                        <Card.Text>{post.body}</Card.Text>
                        
                        <Card.Text>
                            <small className='text-muted'>Tags: {post.tags.length ? post.tags.join(', ') : 'none'}</small>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Accordion.Collapse>
        </Card>
    )
}
export default Post;