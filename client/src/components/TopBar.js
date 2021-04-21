import React, { useState, useEffect } from 'react';
import {Navbar, Nav, NavDropdown, Container, Form, FormControl, Button} from 'react-bootstrap';
import CreatePost from './CreatePost';
const TopBar = ({filterBy, setFilterBy, allTags, sortBy, setSortBy, refresh})=>{
    
        //  Sorting dropdown
        // Filter dropdown
    const [expanded, setExpanded] = useState(false);
    const paddingTop = {paddingTop: '140px'}
    const onNavBarClick = ()=> {

        //another aditional conditional, but it doesn't seem to be having an effect or neccesarry
        // && !(window.scrollY+scrollingAmount > getMaximumScrollInPixels())
        const scrollingAmount = 140;
        if(window.scrollY!==0){
            console.log('true')
            window.scrollBy({
                top: expanded? scrollingAmount: -scrollingAmount,
                behavior:'auto'
            });
        } else {
            //if it wasn't worth scrolling, make sure i dont scroll on the other toggle either.

        }
        setExpanded(!expanded)

    };
    const onChildSelect = (eventKey, e)=>{
        console.log(e);
        debugger;
    }

    return(<div style={{ ...expanded && paddingTop}}>
    <Navbar bg="light" expanded={expanded} onToggle={onChildSelect} style={{border: "thin solid blue"}}  fixed="top" expand="md" onselect={()=>{
        console.log('on select')
    }}>
        <Navbar.Brand style={{color: "blue"}} href="#home">Community Forum</Navbar.Brand>
        <Navbar.Toggle onClick={onNavBarClick} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <NavDropdown title={"Sort By: " + sortBy}  id="basic-nav-dropdown">
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
            <NavDropdown title={filterBy==='default'? 'Filter By : None' : 'Filter By: ' + filterBy} id="basic-nav-dropdown">
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
            <br />
        </Nav>
            <CreatePost refresh={refresh}  setExpanded ={setExpanded}/>
        </Navbar.Collapse>
    </Navbar>
    </div>)
}
export default TopBar;

function getMaximumScrollInPixels (){
    return  Math.max( document.body.scrollHeight, document.body.offsetHeight,
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
}