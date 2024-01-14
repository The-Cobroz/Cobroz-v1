import React, { useState } from 'react';
import AppNavbar from '../../AppNavbar.js';
import 'bootstrap/dist/css/bootstrap.css';
import "../../Styles.css";
import axios from 'axios';


const ChangePassword = () => {
    const [password, setPassword] = useState({
        oldPswd: "",
        pswd : "",
        cnfmPswd: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPassword({...password, [name]: value});
    }

    const saveChanges = (e) => {
        e.preventDefault();

        try{
            if(password.pswd !== password.cnfmPswd){
                alert("Confirmed password doesn't match");
            }
            else if(password.oldPswd === password.cnfmPswd){
                alert("Your new password can't be same as old");
            }
            else{
                axios   
                    .put("http://localhost:5000/profile/password/change", password, {withCredentials: true})
                    .then(response => {
                        if(response.status === 205){
                            alert("Old Password doesn't match");
                        }
                        else if(response.status === 200){
                            alert("Changes saved");
                            window.location.href = "/web/app/settings";
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
        catch(error){
            alert("Error changing password, try again later");
        }
    };

    return (
        <div className='row'>
            <div className='col-sm-3'><AppNavbar/></div>
            <div className='col-sm-9 settings'>
                <div>
                    <h4>Change your Password</h4>
                </div>
                <div>
                    <p>*Make sure that your current and new passwords aren't same</p>
                    <form onSubmit={saveChanges}>
                        <div>
                            <input
                                name='oldPswd'
                                value={password.oldPswd}
                                onChange={handleChange}
                                type='password'
                                placeholder='Current Password'
                            />
                        </div>
                        <div>
                            <input
                                name='pswd'
                                value={password.pswd}
                                type='password'
                                onChange={handleChange}
                                placeholder='New Password'
                            />
                        </div>
                        <div>
                            <input
                                name='cnfmPswd'
                                value={password.cnfmPswd}
                                type='password'
                                onChange={handleChange}
                                placeholder='Confirm new Password'
                            />
                        </div>
                        <button className='btn btn-primary' type='submit'>Change Password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
