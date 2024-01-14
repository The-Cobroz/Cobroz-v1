import React from 'react'
import AppNavBar from "../AppNavbar.js";
import 'bootstrap/dist/css/bootstrap.css';
import "../Styles.css";


const Settings = () => {
  return (
    <div className='row'>
        <div className='col-sm-3'>
            <AppNavBar/>
        </div>
        <div className='col-sm-9 settings-area'>
            <h3>Account Settings</h3>
            <br/>
            <h5>Personal Information</h5>
            <div className="settings-tab">
                <div className='settings-option' onClick={() => {window.location.href = "/web/app/settings/personal/edit"}}>
                    Edit Personal Information
                </div>
                <div className='settings-option' onClick = {() => {window.location.href = "/web/app/settings/phone/edit"}}>
                    Add Phone Number
                </div>
                <div className='settings-option' onClick={() => {window.location.href = "/web/app/settings/password-change"}}>
                    Change Password
                </div>
            </div>
            <br/>
            <h5>Subscription</h5>
            <div className="settings-tab">
                <div className='settings-option'>
                    Upgrade your Account
                </div>
                <div className='settings-option'>
                    Use your Points
                </div>
            </div>
            <br/>
            <h5>Account</h5>
            <div className="settings-tab">
                <div className='settings-option'>
                    Change Account Type
                </div>
                <div className='settings-option delete' onClick={() => {window.location.href = "/web/app/settings/account/delete"}}>
                    Delete Account
                </div>
            </div>
            <br/>
            <h5>Privacy & Help Centre</h5>
            <div className="settings-tab">
                <div className='settings-option'>Profile Photo Privacy</div>
                <div className='settings-option'>Privacy Policy</div>
                <div className='settings-option'>Terms of Use</div>
                <div className='settings-option'>Help Centre</div>
            </div>
        </div>
    </div>
  )
}

export default Settings
