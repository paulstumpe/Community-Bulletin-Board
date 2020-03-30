import React, { useState, useEffect } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import axios from 'axios';
const CreatePost = ({refresh, post})=>{
    const editing = post;
    if (!editing){
        post = {
            title:'',
            body:'',
            tags:[],
        }
    }
    //top padding ensure no overlap with navbar
    const [show, setShow] = useState(false);
    const [tag, setTag] = useState('');
    const [body, setBody] = useState(post.body);
    const [title, setTitle] = useState(post.title);
    const [tags, setTags] = useState(post.tags);

    const clearAllFields = ()=>{
        setTags([]);
        setTitle('');
        setBody('');
        setTag('');
    }

    const handleClose = () => {
        clearAllFields()
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const handleAddTag = ()=>{
        setTags(tags.concat(tag));
        setTag('');
    };
    const handleSubmit = () =>{
        if(editing){
            post.title=title;
            post.body=body;
            post.tags=(tag.length ? tags.concat(tag) : tags);
            axios.patch('/editpost', post)
                .then(refresh)
            setShow(false)
        } else {
            axios.post('/createpost', {
                title,
                body,
                tags : (tag.length ? tags.concat(tag) : tags)
            })
                .then(refresh)
            handleClose();
        }
    };
    return(<div>
        {editing? <Button onClick={handleShow} size="sm"  style={{margin:'5px'}}  >Edit Post</Button> 
        : <Button onClick={handleShow} variant="outline-primary">Create Post</Button>}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Creating Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="Title">
                    <Form.Label>title</Form.Label>
                    <Form.Control 
                    type="text" 
                    size="lg" 
                    placeholder="Type the title of your post here"
                    value={title}
                    onChange={(event)=>{
                        setTitle(event.target.value)
                    }}

                    />
                </Form.Group>
                <Form.Group controlId="Body">
                    <Form.Label>body</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Type the body of your post here"
                    value={body}
                    onChange={(event)=>{
                        setBody(event.target.value)
                    }}
                    />
                </Form.Group>
                <Form.Group controlId="Tag">
                    <Form.Label>Add Tag</Form.Label>
                    <Form.Control 
                    type="text" 
                    size="sm"
                    placeholder="Type one tag and click add"
                    value={tag}
                    onChange={(event)=>{
                        setTag(event.target.value)
                    }}
                    >
                                            
                    </Form.Control>
                    <p></p>
                    <Button size="sm" style={{float:'right'}} onClick={handleAddTag}>Add Tag</Button>
                    <p>{tags.join(', ')}</p>
                    <Button size="sm" 
                    variant="outline-danger" 
                    onClick={()=>{setTags([])}}
                    disabled={!tags.length}
                    >Clear Tags</Button>                    
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Post
          </Button>
        </Modal.Footer>
      </Modal>
    </div>)
}
export default CreatePost;