import React, { useState } from 'react';
import AppNavbar from '../../AppNavbar.js';
import 'bootstrap/dist/css/bootstrap.css';
import "../../Styles.css";
import axios from 'axios';


const DeleteAcc = () => {
    const [input, setInput] = useState({
        password: "",
        feedback: ""
    });

    const [click, setClick] = useState(0);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInput({...input, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(click === 0){
            setClick(1);
            alert("Are you sure you want to delete your Account");
        }
        else if(click === 1){
            try{
                axios
                    .delete("http://localhost:5000/profile/deleteAccount", {withCredentials: true, data: input})
                    .then(response => {
                        if(response.status === 200){
                            window.location.href = "/auth/register";
                        }
                    })
                    .catch(error => {
                        alert("Error deleting account, try again later");
                    })
            }   
            catch(error){
                alert("Error deleting account, try again later");
            }
        }
    }

    return (
        <div className='row'>
            <div className='col-sm-3'><AppNavbar/></div>
            <div className='col-sm-9 settings'>
                <div>
                    <h4>Delete Your Cobroz Account</h4>
                </div>
                <div>
                    <p>We are sorry to see you leave.</p>
                    <ul>
                        <li>We request you to think again about deleting your account.</li>
                        <li>Once deleted all the information related to your account will also be deleted</li>
                        <li>You wouldn't have access to this information if you create a new account</li>
                    </ul>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <h6>Help us improve Cobroz with valuable feedback</h6>
                            <div>
                                <textarea
                                    name='feedback'
                                    value={input.feedback}
                                    onChange={handleChange}
                                    placeholder='Share it here'
                                    rows={5}
                                    cols={50}
                                />
                            </div>
                            <br/>
                            <h6>Enter your password to confirm it's you</h6>
                            <div>
                                <input
                                    name='password'
                                    value={input.password}
                                    type='password'
                                    onChange={handleChange}
                                    placeholder='Your Password'
                                />
                            </div>
                            <br/>
                            <button className='btn btn-outline-danger' type='submit'>Delete Account</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAcc
