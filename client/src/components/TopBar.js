import React, { useState, useEffect } from 'react';
import {Navbar, Nav, NavDropdown, Container, Form, FormControl, Button} from 'react-bootstrap';
const TopBar = ({filterBy, setFilterBy, allTags})=>{
    
        //  Sorting dropdown
        // Filter dropdown 
    return(<div>
    <Navbar fixed="top">
        <Navbar.Brand href="#home">Community Forum</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <NavDropdown title="Sort By" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Filter By" id="basic-nav-dropdown">
                {allTags.map(tag=>(
                <NavDropdown.Item 
                    active={tag===filterBy}
                    onClick={()=>{setFilterBy(tag)}}
                >{tag}</NavDropdown.Item>
                ))}
                <NavDropdown.Divider />
            </NavDropdown>
        </Nav>
            <Button variant="outline-success">Create Post</Button>
        </Navbar.Collapse>
    </Navbar>
    </div>)
}
export default TopBar;