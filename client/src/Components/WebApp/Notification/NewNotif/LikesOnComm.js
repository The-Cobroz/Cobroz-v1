import React, { useEffect, useState } from 'react';
import "../../Styles.css";
import axios from 'axios';

const LikesOnComm = ({data}) => {

    const [sender, setSender] = useState({});
    const [comment, setComment] = useState({});

    const renderSender = async() => {
        try{
            const senderData = await axios.get("http://localhost:5000/profile/getUserDetails", {
                withCredentials: true,
                params: {
                    from: data.from,
                    fromType: data.fromType
                }
            });
            if(senderData.status === 200){
                setSender(senderData.data);
            }
        }
        catch(error){
            console.error();
        }
    }

    const renderComment = async() => {
        try{
            const commData = await axios.get("http://localhost:5000/forum/getComment", {
                withCredentials: true,
                params: {
                    commentID: data.data.id
                }
            });
            if(commData.status === 200){
                setComment(commData.data);
            }
        }
        catch(error){
            alert("Error finding post");
        }
    }

    useEffect(() => {
        renderSender();
        renderComment();
    },[]);

    const handleClick = async() => {
        const clicked = await axios.put("http://localhost:5000/notif/changeAction", {id: data._id});
        if(clicked.status === 200){
            window.location.href = `/web/app/post/${comment.postID}`
        }
        else{
            alert("Error connecting with Server");
        }
    } 

    return(
        <div className='row notification'>
            <div className='col-sm-1'></div>
            <div className='col-sm-11 notif-text'>
                <h6>{sender ? sender.name + " has liked your comment. Click to see" : "Someone liked your comment. Click to see"}</h6>
            </div>
        </div>
    )
}

export default LikesOnComm;
