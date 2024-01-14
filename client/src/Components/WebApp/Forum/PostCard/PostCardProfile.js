import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "./PostCardStyles.css";
import axios from 'axios';
import pic from "../../../../Images/profile-image.png";

const PostCardProfile = (postID) => {

    const [post, setPost] = useState({
        name: "",
        content: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/forum/getPost", {
                    params: { postID: postID },
                    withCredentials: true
                });
                setPost(response.data);
                setLoading(false); 
            } catch (error) {
                console.error(error);
            }
        }

        fetchPostData();
    }, [postID]);  // Only depend on postID

    if(loading){
        return(<div>Loading...</div>)
    }

    return (
        <div className='post'>
            <div className='row upperPart'>
                <div className='col-sm-1 cardPic'>
                    <img src={pic} alt={post.name}/>
                </div>
                <div className='col-sm-6'>
                    <h6>{post.name}</h6>
                </div>
            </div>
            <div className='row query'>
                <div className='col-sm-1'></div>
                <div className='col-sm-6'>
                    <p>{post.content}</p>
                </div>
            </div>
            <div className='row'>
            </div>
        </div>
    )
}

export default PostCardProfile
