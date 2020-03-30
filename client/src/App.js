import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap'
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import TopBar from './components/TopBar';
import axios from 'axios';

const App = () => {
  //array of all posts from server
  const [allPosts, setAllPosts] = useState([
    {
      tags: ['Help', 'ComputerStuff'],
      body: "This is my body",
      title: 'Post 1',
      dateCreated: 'today',
      upVotes : 1
    },
    {
      tags: ['Help', 'what'],
      body: "This is my body",
      title: 'Post 2',
      dateCreated: '',
      upVotes: 2
    }
  ])
  //string representing selected sorting mechanism
  const [allTags, setAllTags] = useState([''])
  const [sortBy, setSortBy] = useState('Most Recent')
  //string representing selected tag filter
  const [filterBy, setFilterBy] = useState('default')
  const [refreshing, setRefreshing] = useState(false)

  const refresh = ()=>{
    setRefreshing(true);
  }
  
  useEffect(()=>{
    
    axios.get('/allposts')
      .then(({data})=>{
        let posts = data;
        if(sortBy === "Most Recent"){
          posts = posts.sort((a,b)=>{
            if ( a.dateCreated < b.dateCreated ){
              return 1;
            }
            if ( a.dateCreated > b.dateCreated ){
              return -1;
            }
            return 0;
          })
          console.log(posts)
        } else if (sortBy === "Most Upvoted"){
          posts = posts.sort((a,b)=>{
            if ( a.upVotes < b.upVotes ){
              return 1;
            }
            if ( a.upVotes > b.upVotes ){
              return -1;
            }
            return 0;
          
          })
          console.log(posts)
        } else if (sortBy=== "Alphabetical"){
          posts = posts.sort((a,b)=>{
            if ( a.title < b.title ){
              return -1;
            }
            if ( a.title > b.title ){
              return 1;
            }
            return 0;
          
          })
        }
        const tags = [];
        posts.forEach((post)=>{
          post.tags.forEach(tag=>{
            if(!tags.includes(tag)){
              tags.push(tag);
            }
          })
        })
        console.log(posts)
        setAllPosts(posts);
        setAllTags(tags);
        setRefreshing(false);
      })
      .catch(err=>console.log(err))

  }, [sortBy, refreshing])

  return (
    <Container>
      <div className="App">
        <TopBar allTags={allTags} 
          filterBy={filterBy} 
          setFilterBy={setFilterBy} 
          sortBy={sortBy} 
          setSortBy={setSortBy}
          refresh={refresh} />
        <PostList allPosts={allPosts} filterBy={filterBy} refresh={refresh}/>
      </div>
    </Container>
  )
}

export default App;
