import React from 'react';
import "../../Styles.css";
import axios from 'axios';
import profile from "../../../../Images/profile-image.png";

const CommOnPost = () => {
    return(
        <div className='row notification'>
            <div className='col-sm-1 notif-image'>
                <img src={profile}/>
            </div>
            <div className='col-sm-11 notif-text'>
                <h6>Name Surname commented on your post. Click to see</h6>
            </div>
        </div>
    )
}

export default CommOnPost;
