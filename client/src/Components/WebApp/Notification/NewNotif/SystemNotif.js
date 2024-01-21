import React, { useState, useEffect } from 'react';
import "../../Styles.css";
import axios from 'axios';

const SystemNotif = ({data}) => {
    const [notifText, setNotifText] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {
        if (data.type === "welcome") {
            setNotifText("Welcome to the world of Cobroz. We hope that you have a great experience with us. Click to set your details.");
            setLink("/web/app/settings");
        } else if (data.type === "changePhNo") {
            setNotifText("Please add/change your phone number.");
            setLink("/web/app/settings/phone/edit");
        }
    }, [data.type]);

    const handleClick = async() => {
        const clicked = await axios.put("http://localhost:5000/notif/changeAction", {id: data._id});
        if(clicked.status === 200){
            window.location.href = link;
        }
        else{
            alert("Error connecting to Server");
        }
    };

    return (
        <div className='row notification' onClick={handleClick}>
            <h6>{notifText}</h6>
        </div>
    );
}

export default SystemNotif;