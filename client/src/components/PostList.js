import React, { useState, useEffect } from 'react';
import Post from './Post';
import {Accordion,Card} from 'react-bootstrap'

const PostList = ({allPosts, filterBy, refresh})=>{
    return(<div style={{'paddingTop': '70px'}}>
        <Accordion >
            {allPosts.map((post, i)=>{
                if(filterBy==='default' || post.tags.includes(filterBy)){
                    return (<Post refresh={refresh} post={post} i={i} key={post._id}/>)
                }
                })}
        </Accordion>
    </div>)
}
export default PostList;