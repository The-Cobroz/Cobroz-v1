import React from 'react';
import "../../Styles.css";
import axios from 'axios';
import profile from "../../../../Images/profile-image.png";

const LikesOnPost = () => {
    return(
        <div className='row notification'>
            <div className='col-sm-1'></div>
            <div className='col-sm-11 notif-text'>
                <h6>You have got X likes on one of your post. Click to see</h6>
            </div>
        </div>
    )
}

export default LikesOnPost
