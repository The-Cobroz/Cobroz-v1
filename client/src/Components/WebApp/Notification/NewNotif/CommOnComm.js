import React, { useEffect, useState } from 'react';
import "../../Styles.css";
import axios from 'axios';
import profile from "../../../../Images/profile-image.png";

const CommOnComm = ({data}) => {

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

    async function handleClick(){
        const clicked = await axios.put("http://localhost:5000/notif/changeAction", {id: data._id});
        if(clicked.status === 200){
            //window.location.href = `/web/app/post/${}`;
            // additions to be done:
            // on click it should take to the comment at which reply is added
        }
        else{
            alert("Error connecting with Server");
        }
    }

    return(
        <div className='row notification'>
            <div className='col-sm-1 notif-image'>
                <img src={profile}/>
            </div>
            <div className='col-sm-11 notif-text'>
                <h6>{sender ? sender.name + " replied to your comment. Click to see" : "Someone replied to your comment. Tap to see"}</h6>
            </div>
        </div>
    )
}

export default CommOnComm
