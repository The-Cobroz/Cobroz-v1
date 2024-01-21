import React, {useState, useEffect} from 'react';
import "../../Styles.css";
import axios from 'axios';
import profile from "../../../../Images/profile-image.png";

const FollowRequestNotif = ({data}) => {
  const [user, setUser] = useState({});

  const renderUser = async() => {
    try{
      console.log(data);
      const userData = await axios.get("http://localhost:5000/profile/getUserDetails", {
        params: {
          from: data.from,
          fromType: data.fromType
        },
        withCredentials: true
      });

      if(userData.status === 200){
        setUser(userData.data);
      }
    }
    catch(error){
      console.error();
    }
  };

  useEffect(() => {
    renderUser();
  },[]);

  const handleClick = () => {
    window.location.href = `/web/app/user/${user.username}`;
  }

  return (
    <div className='row notification' onClick={handleClick}>
        <div className='col-sm-1 notif-image'>
          <img src={profile} alt={user.name}/>
        </div>
        <div className='col-sm-10 notif-text'>
          <h6>{user ? user.name + " wants to bro you. Add them to your list.": "Someone wants to bro you. Click to see" } </h6>
        </div>
        <div className='col-sm-1'>
          <button className='btn btn-light'>Accept </button>
        </div>
    </div>
  )
}

export default FollowRequestNotif;
