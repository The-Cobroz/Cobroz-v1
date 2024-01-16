import React from 'react'
import AppNavbar from '../AppNavbar';
import "../Styles.css";
import profile from "../../../Images/profile-image.png";
import FollowRequestNotif from './NewNotif/FollowRequestNotif';
import CommOnPost from './NewNotif/CommOnPost';
import CommOnComm from './NewNotif/CommOnComm';
import PaymentAlert from './NewNotif/PaymentAlert';
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
                    <FollowRequestNotif/>
                    <CommOnPost/>
                    <CommOnComm/>
                    <PaymentAlert/>
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
