import React from 'react';
import logo from "../../Images/cobroz-removebg-preview.png";
import "./Styles.css";
const AppNavbar = () => {
    return (
        <div className='appNavbar'>
            <div className='home'>
                <img src={logo} alt='Home' onClick={() => {window.location.href = "/web/app"}}/>
            </div>
            <div className='middle'>
                <div className='item' onClick={() => {window.location.href = "/web/app/profile"}}><h6>Profile</h6></div>
                <div className='item' onClick={() => {window.location.href = "/web/app/notifications"}}><h6>Notifications</h6></div>
                <div className='item' onClick={() => {window.location.href = "/web/app/post"}}><h6>New Post</h6></div>
                <div className='item' onClick={() => {window.location.href = "/web/app/chat"}}><h6>Chats</h6></div>
                <div className='item' onClick={() => {window.location.href = "/web/app/settings"}}><h6>Settings</h6></div>
            </div>
            <div className='lower'>
                <div className='pointed' onClick={() => {window.location.href = "/web/app/logout"}}><h6>Logout</h6></div>
                <div><a href='/privacy-policy'>Privacy Policy</a></div>
                <div><a href='/terms-of-use'>Terms of Use</a></div> 
            </div>
        </div>
    )
}

export default AppNavbar;
