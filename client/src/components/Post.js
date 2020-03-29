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
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={i}>
            {post.title}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={i}>
                <Card>
                    <Card.Body>{post.body}</Card.Body>
                    <Card.Footer>Tags: {post.tags.length ? post.tags.join(', ') : 'none'}</Card.Footer>
                </Card>
            </Accordion.Collapse>
        </Card>
    )
}
export default Post;