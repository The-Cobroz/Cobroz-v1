import React ,{useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "./PostCardStyles.css";
import axios from 'axios';
import likeicon from "../../../../Images/likeicon.png";
import like from "../../../../Images/like.png";
import dislikeicon from "../../../../Images/dislikeicon.png";
import dislike from "../../../../Images/dislike.png";
import pic from "../../../../Images/profile-image.png";
import commentPic from "../../../../Images/comment.png"


const PostCard = ({data}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [user, setUser] = useState("");

  let upvotes = data.upvotes;
  let downvotes = data.downvotes;
  let views = data.views + 1;

  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await axios.get("http://localhost:5000/profile/getUser", {withCredentials: true, params: {userID: data.postedBy}});
        if(response.status === 200){
          setUser(response.data);
        }
        else if(response.status === 205){
          alert("Account doesn't exist");
        }
      }
      catch(error){
        alert("Error fetching details, try again later");
      }
    }

    fetchData();
  },[data]);

  const handleLike = () => {
    setLiked(!liked);
    if(disliked){
      setDisliked(false);
      downvotes = downvotes + 1;
    }
    upvotes = upvotes + 1;
  }

  const handleDislike = () => {
    setDisliked(!disliked);
    if(liked){
      setLiked(false);
    }
  }

  const sendPost = () => {
    window.location.href = `/web/app/post/:${data._id}`;
    
  }

  return (
    <div className='postCard'>
      <div className='row'>
        <div className='col-sm-1 profile'>
          <img src={pic} alt='profile' className='profilePicApp'/>
        </div>
        <div className='col-sm-6'>
          <h4>{user.name}</h4>
        </div>
      </div>
      <div className='row content'>
        <div className='col-sm-1'></div>
        <div className='col-sm-11'>
          <p>{data.content}</p>
          {/* <p>{tags.map((tag, index) => (
            tag
          ))}</p> */}
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-1'></div>
        <div className='col-sm-11 postToolsApp'>
          <div className='icon' onClick={handleLike}>
            <img src={liked ? like : likeicon} alt='like'/>
            <p>{upvotes}</p>
          </div>
          <div className='icon' onClick={handleDislike}>
            <img src={disliked ? dislike : dislikeicon} alt='dislike'/>
            <p>{downvotes}</p>
          </div>
          <div className='icon' onClick={sendPost}>
            <img src={commentPic} alt='comment'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
