import React, { useState, useEffect } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import axios from 'axios';
const CreatePost = ({refresh})=>{
    //top padding ensure no overlap with navbar
    const [show, setShow] = useState(false);
    const [tag, setTag] = useState('');
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);

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
        axios.post('/createpost', {
            title,
            body,
            tags : (tag.length ? tags.concat(tag) : tags)
        })
            .then(refresh)
        handleClose();
    };
    return(<div>
        <Button onClick={handleShow} variant="outline-success">Create Post</Button>

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