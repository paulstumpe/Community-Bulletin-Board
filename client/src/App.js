import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap'
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import TopBar from './components/TopBar';

const App = () => {
  //array of all posts from server
  const [allPosts, setAllPosts] = useState([])
  //string representing selected sorting mechanism
  const [sortedBy, setSortedBy] = useState('')
  //string representing selected tag filter
  const [filterBy, setFilterBy] = useState('')
  return (
    <Container>
      <div className="App">
        <TopBar/>
        <CreatePost />
        <PostList/>
      </div>
    </Container>
  )
}

export default App;
