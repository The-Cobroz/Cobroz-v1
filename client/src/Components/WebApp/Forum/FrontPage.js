import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "./ForumStyles.css";
import AppNavbar from '../AppNavbar';
import PostCard from './PostCard/PostCard.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import EndMessage from './EndMessage.js';

const FrontPage = () => {

    const [seenPosts, setSeenPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchData = async() => {
        try{
            const response = await axios.get("http://localhost:5000/forum/getAllPosts", {withCredentials: true});
            const newPosts = response.data.posts;
            console.log(newPosts);
            //update with new Posts
            if(!posts.includes(newPosts)){
                setPosts(prevPosts => [...prevPosts, ...(Array.isArray(newPosts) ? newPosts : [])]);
            }
            console.log(posts);
            if(newPosts.length === 0){
                alert("Unable fetch posts");
                setHasMore(false);
            }

        }
        catch(error){
            alert("Error fetching data, try again later");
            console.log(error);
        }
    };

    const fetchUser = async() => {
        try{
            const userData = await axios.get("http://localhost:5000/profile/getProfile", {withCredentials: true});
            setSeenPosts(userData.data.seenPosts);
        }
        catch(error){
            alert("Error fetching user");
        }
    }

    useEffect(() => {
        fetchUser();
    },[]);

    useEffect(() => {
        fetchData();
    },[]);

    const markAsSeen = async(id) => {
        try{
            const response = await axios.put("http://localhost:5000/profile/posts/seen", {postID: id}, {withCredentials: true});
            if(response.status === 200){
                return true;
            }
        }
        catch(error){
            alert("Unable to update");
        }
        return false;
    };

    const renderPostCards = () => {
        return posts.map(post => {
            if(seenPosts.includes(post._id)){
                return null;
            }
            else{
                if(markAsSeen(post._id)){
                    return <PostCard key={post._id} data={post} />
                }
            }
        });
    };


    return (
        <div className='row'>
            <div className='col-sm-3'>
                <AppNavbar/>
            </div>
            <div className='col-sm-9 feedPage'>
                <h3>Welcome to Cobroz World</h3>
                <div className='post-area'>
                    <div className='postInput' onClick={() => {window.location.href = "/web/app/post"}}>What's happening?!</div>
                    <button className='btn btn-outline-dark' onClick={() => {window.location.href = "/web/app/post"}}>Post</button>
                </div>
                <InfiniteScroll
                    dataLength={posts.length}
                    next={() => {
                        setPage(page+1);
                        fetchData();
                    }}
                    hasMore={hasMore}
                    loader={
                            <div className='center'>
                                <div className='loader'>
                                    
                                </div>
                                <div>
                                    <h4>Loading...</h4>
                                </div>
                            </div>
                           }
                    endMessage={EndMessage}
                >
                    {renderPostCards()}
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default FrontPage
