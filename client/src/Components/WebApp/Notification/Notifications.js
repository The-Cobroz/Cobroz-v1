import React, {useState, useEffect} from 'react'
import AppNavbar from '../AppNavbar';
import axios from 'axios';
import "../Styles.css";
import FollowRequestNotif from './NewNotif/FollowRequestNotif';
import CommOnPost from './NewNotif/CommOnPost';
import CommOnComm from './NewNotif/CommOnComm';
import SystemNotif from './NewNotif/SystemNotif';
import LikesOnPost from './NewNotif/LikesOnPost';
import LikesOnComm from './NewNotif/LikesOnComm';

const Notifications = () => {

    const [notifs, setNotifs] = useState([]);

    const fetchNotifs = async() => {
        try{
            const notifData = await axios.get("http://localhost:5000/notif/getNotifs", {withCredentials: true});
            setNotifs(notifData.data);
            console.log(notifData.data);
        }
        catch(error){
            console.error();
        }
    }

    useEffect(() => {
        fetchNotifs();
    },[])

    const renderNotifications = () => {
        return notifs.map((notif) => {
            var notifType = notif.type;

            if(notifType === "welcome"){
                return <SystemNotif key={`${notif.type}+${notif._id}`} data={notif} />
            }
            else if(notifType === "reqSent"){
                return <FollowRequestNotif key={`${notif.type}+${notif._id}`} data={notif} />
            }
            else if(notifType === "changePhNo"){
                return <SystemNotif key={`${notif.type}+${notif._id}`} data={notif} />
            }
            else if(notifType === "postLikes"){
                return <LikesOnPost key={`${notif.type}+${notif._id}`} data={notif} />
            }
            else if(notifType === "commLikes"){
                return <LikesOnComm key={`${notif.type}+${notif._id}`} data={notif} />
            }
            else if(notifType === "commcomm"){
                return <CommOnComm key={`${notif.type}+${notif._id}`} data={notif} />
            }
            else if(notifType === "postcomm"){
                return <CommOnPost key={`${notif.type}+${notif._id}`} data={notif} />
            }
        });
    }

    return (
        <div className='row'>
            <div className='col-sm-3'>
                <AppNavbar/>
            </div>
            <div className='col-sm-9'>
                <div className='notificationCentre'>
                    <h4>New Notifications</h4>
                    <div>
                        {notifs.length > 0 ? renderNotifications() : "Loading ...."}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notifications;
