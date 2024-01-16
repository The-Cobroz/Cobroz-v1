import React, {useState, useEffect} from 'react';
import "../../Styles.css";
import axios from 'axios';
import profile from "../../../../Images/profile-image.png";

const FollowRequestNotif = () => {
  const [name, setName] = useState("");


  return (
    <div className='row notification'>
        <div className='col-sm-1 notif-image'>
          <img src={profile}/>
        </div>
        <div className='col-sm-10 notif-text'>
          <h6>Name Surname wants to bro you. Add them to your list.</h6>
        </div>
        <div className='col-sm-1'>
          <button className='btn btn-light'>Accept </button>
        </div>
    </div>
  )
}

export default FollowRequestNotif
