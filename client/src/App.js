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
  const [allTags, setAllTags] = useState([])
  const [sortedBy, setSortedBy] = useState('')
  //string representing selected tag filter
  const [filterBy, setFilterBy] = useState('')
  useEffect(()=>{
    const posts = [
      {
        tags: ['Help', 'ComputerStuff'],
        body: "This is my body",
        title: 'Post 1',
        dateCreated: ''
      },
      {
        tags: ['Help', 'what'],
        body: "This is my body",
        title: 'Post 2',
        dateCreated: ''
      }
    ]
    const tags = [];
    posts.forEach((post)=>{
      post.tags.forEach(tag=>{
        if(!tags.includes(tag)){
          tags.push(tag);
        }
      })
    })
    setAllPosts(posts);
    setAllTags(tags);

  }, [])

  return (
    <Container>
      <div className="App">
        <TopBar allTags={allTags} filterBy={filterBy} setFilterBy={setFilterBy}/>
        <CreatePost />
        <PostList allPosts={allPosts} filterBy={filterBy}/>
      </div>
    </Container>
  )
}

export default App;
