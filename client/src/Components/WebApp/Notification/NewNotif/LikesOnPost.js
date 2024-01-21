import React, {useState, useEffect} from 'react';
import "../../Styles.css";
import axios from 'axios';

const LikesOnPost = ({data}) => {
    
    const [sender, setSender] = useState({});

    const renderSender = async() => {
        try{
            const senderData = await axios.get("http://localhost:5000/profile/getUserDetails", {
                params: {
                    from: data.from,
                    fromType: data.fromType
                },
                withCredentials: true
            });
            if(senderData.status === 200){
                setSender(senderData.data);
            }
        }
        catch(error){
            console.error();
        }
    }

    useEffect(() => {
        renderSender();
    },[]);

    const handleClick = async() => {
        const clicked = await axios.put("http://localhost:5000/notif/changeAction", {id:data._id});
        if(clicked.status === 200){
            window.location.href = `/web/app/post/${data.data.id}`;
        }
        else{
            alert("Error Connecting to Server");
        }
    }

    return(
        <div className='row notification' onClick={handleClick}>
            <div className='col-sm-1'></div>
            <div className='col-sm-11 notif-text'>
                <h6>{sender ? sender.name + " liked your post. Click to see" : "Someone liked your post. Click to see"}</h6>
            </div>
        </div>
    )
}

export default LikesOnPost;
