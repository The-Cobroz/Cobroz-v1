import React from 'react'
import MainNavbar from '../../MainNavbar.js'
import Footer from '../../Footer.js';
import 'bootstrap/dist/css/bootstrap.css';
import "../../Styles.css";
import "../Styles.css";
import { useState } from 'react';
import axios from 'axios';

const UserRegister = () => {

    const [account, setAccount] = useState({
        name: "",
        email: "",
        password: "",
        cnfmPassword: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAccount({
            ...account, [name]: value
        });
    }

    const register = (e) => {
        e.preventDefault();
        try{
            if(account.password !== account.cnfmPassword){
                alert("Password doesn't match");
            }
            else{
                const formData = {name: account.name, email: account.email, password: account.password};
                axios   
                    .post("http://localhost:5000/auth/register/user", formData, {withCredentials: true})
                    .then(response => {
                        if(response.status === 200){
                            window.location.href = "/web/app/profile";
                        }
                        else if(response.status === 205){
                            alert("User with email already exists Proceed to Log In");
                        }
                    })
                    .catch(() => console.error());
            }
        }catch(error){
            console.error();
        }
    }

    return (
        <>
            <MainNavbar/>
            <div className='bg'>
                <div className='inner'>
                    <h2>SIGN UP</h2>
                    <h3>Client Account</h3>
                    <form onSubmit={register}>
                        <div>
                        <input
                            type='text'
                            name='name'
                            value={account.name}
                            placeholder='Enter your Name'
                            onChange={handleChange}
                            required
                        />
                        </div>
                        <div>
                        <input
                            type='email'
                            name='email'
                            value={account.email}
                            onChange={handleChange}
                            placeholder='Enter your Email'
                            required
                        />
                        </div>
                        <div>
                            <input
                                type='password'
                                name='password'
                                value={account.password}
                                placeholder='Choose your Password'
                                onChange={handleChange}
                                required
                            />
                        </div>          
                        <div>
                            <input
                                type='password'
                                name='cnfmPassword'
                                value={account.cnfmPassword}
                                placeholder='Confirm your password'
                                onChange={handleChange}
                                required
                            />
                        </div>          
                        <button className='btn btn-primary' type='submit'>JOIN NOW</button>    
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default UserRegister
