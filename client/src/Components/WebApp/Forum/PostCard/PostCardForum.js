import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "./PostCardStyles.css";
import likeicon from "../../../../Images/likeicon.png";
import like from "../../../../Images/like.png";
import dislikeicon from "../../../../Images/dislikeicon.png";
import dislike from "../../../../Images/dislike.png";
import pic from "../../../../Images/profile-image.png"
import AppNavbar from '../../AppNavbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';

//this component will be called if the user clicks on a post hence providing full screen to that post
const PostCardForum = () => {
    //const {postID} = useParams();
    const [post, setPost] = useState({});
    const [posted, setPosted] = useState("");
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [comment, setComment] = useState("");

    useEffect(() => {
        async function fetchData(){
            try{
                await axios
                            .get("http://localhost:5000/forum/getPost", {withCredentials: true})
                            .then(response => {
                                if(response.status === 200){
                                    setPost(response.data);
                                    console.log(post);
                                }
                                else{
                                    alert("Error fetching post");
                                }
                            })
                            .catch(error => console.log(error));
            }
            catch(error){
                alert("Couldn't find post");
            }
        };

        async function fetchPosted(){
            try{
                const response = await axios.get("http://localhost:5000/profile/getUser", {withCredentials: true, params:{userID: post.postedBy}});
                if(response.status === 200){
                    setPosted(response.data.name);
                    console.log(posted);
                }
            }
            catch(error){
                console.log(error);
            }
        };

        fetchData(); 
        fetchPosted();
    }, []);

    const handleLike = () => {
        setLiked(!liked)
        if(disliked){
            setDisliked(false);
        }
        console.log(liked);
    }

    const handleDislike = () => {
        setDisliked(!disliked);
        if(liked){
            setLiked(false);
        }
        console.log(disliked);
    }

    return (
        <div className='row'>
            <div className='col-sm-3'>
                <AppNavbar/>
            </div>
            <div className='col-sm-9 forumPost'>
                <div className='row upperPost'> 
                    <div className='col-sm-2 profile'>
                        <img src={pic} alt="profile pic"/>
                    </div>
                    <div className='col-sm-5'>
                        <h4>{posted}</h4>
                     </div>
                </div>
                <div className='row'>
                    <div className='col-sm-2'></div>
                    <div className='col-sm-10 postQuery'>
                        <p>{post.content}</p>
                        <p></p>
                        <p>Tags</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-2'></div>
                    <div className='col-sm-10 postTools'>
                        <div className='icon' onClick={handleLike}>
                            <img src={liked ? like : likeicon} alt='like'/>
                        </div>
                        <div className='icon' onClick={handleDislike}>
                            <img src={disliked ? dislike : dislikeicon} alt='dislike'/>
                        </div>
                        
                    </div>
                </div>
                <form >
                    <input
                        type='text'
                        name='commment'
                        placeholder='Add a Comment'
                        value={comment}
                        onChange={(e) => {setComment(e.target.value)}}
                        className='commentBar'
                    />
                    <button className='btn btn-outline-primary' type='submit'>Comment</button>
                </form>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default PostCardForum
