import React from 'react'
import AppNavbar from '../AppNavbar';
import "../Styles.css";
import profile from "../../../Images/profile-image.png";
const Notifications = () => {
  return (
    <div className='row'>
        <div className='col-sm-3'>
            <AppNavbar/>
        </div>
        <div className='col-sm-9'>
            <div className='notificationCentre'>
                <h4>New Notifications</h4>
                <div>
                    <div className='row notification'>
                        <div className='col-sm-1 notif-image'>
                            <img src={profile} alt="Name's profile photo"/>
                        </div>
                        <div className='col-sm-10 notif-text'>
                            <h6>Name Surname sent a bro request. Add them to your list</h6>
                        </div>
                        <div className='col-sm-1'>
                            <button className='btn btn-light'>Accept</button>
                        </div>
                    </div>
                    <div className='row notification'> 
                        <div className='col-sm-1 notif-image'>
                            <img src={profile}/>
                        </div>
                        <div className='col-sm-11 notif-text'>
                            <h6>Name Surname commented on your post</h6>
                        </div>
                    </div>
                </div>
                <h4 className='prevNotif'>Previous Notifications</h4>
                <div>
                    <div className='row notification'>
                        <div className='notif-text'>
                            <h6>You made 20 broz in this month. See it here</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Notifications;
