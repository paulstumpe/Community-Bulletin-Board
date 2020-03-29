import React, { useState, useEffect } from 'react';
import {Navbar, Nav, NavDropdown, Container, Form, FormControl, Button} from 'react-bootstrap';
import CreatePost from './CreatePost';
const TopBar = ({filterBy, setFilterBy, allTags, sortBy, setSortBy})=>{
    
        //  Sorting dropdown
        // Filter dropdown 

    return(<div>
    <Navbar fixed="top">
        <Navbar.Brand href="#home">Community Forum</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <NavDropdown title="Sort By" id="basic-nav-dropdown">
                <NavDropdown.Item 
                active={sortBy==='Most Recent'}
                onClick={()=>{setSortBy('Most Recent')}}>Most Recent</NavDropdown.Item>
                <NavDropdown.Item 
                active={sortBy==='Most Upvoted'}
                onClick={()=>{setSortBy('Most Upvoted')}}>Most Upvoted</NavDropdown.Item>
                <NavDropdown.Item 
                active={sortBy==='Alphabetical'}
                onClick={()=>{setSortBy('Alphabetical')}}>Alphabetical</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Filter By" id="basic-nav-dropdown">
                <NavDropdown.Item 
                        active={filterBy==='default'}
                        onClick={()=>{setFilterBy('default')}}
                    >No Filter
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {allTags.map(tag=>(
                <NavDropdown.Item 
                    key={tag}
                    active={tag===filterBy}
                    onClick={()=>{setFilterBy(tag)}}
                >{tag}</NavDropdown.Item>
                ))}
            </NavDropdown>
        </Nav>
            <CreatePost />
        </Navbar.Collapse>
    </Navbar>
    </div>)
}
export default TopBar;