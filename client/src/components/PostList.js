import React, { useState, useEffect } from 'react';
import Post from './Post';
import {Accordion,Card} from 'react-bootstrap'

const PostList = ({allPosts, filterBy})=>{
    console.log(allPosts)
    return(<div style={{'paddingTop': '70px'}}>
        <Accordion >
            {allPosts.map((post, i)=>{
                if(filterBy==='default' || post.tags.includes(filterBy)){
                    return (<Post post={post} i={i} key={post.title}/>)
                }
                })}
        </Accordion>
    </div>)
}
export default PostList;