import React, {useState} from 'react';
import axios from "axios";
import MainNavbar from '../MainNavbar.js';
import Footer from '../Footer.js';
import 'bootstrap/dist/css/bootstrap.css';
import "./Styles.css";
import "../Styles.css";

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name]: value
        });
    }

    const moveToJoin = () => {
        window.location.href = "/auth/register";
    }

    const login =(e) => {
        e.preventDefault();
        try{
            axios
                .post("http://localhost:5000/auth/login", formData, {withCredentials: true})
                .then(response => {
                    if(response.status === 200){
                        window.location.href = "/web/app";
                    }
                    else if(response.status === 205){
                        alert("Wrong Credentials");
                    }
                })
                .catch(() => console.error());
        }catch(error){
            console.error();
        }
    }

    return (
        <>
            <MainNavbar/>
            <div className='bg'>
                <div className='inner'>
                    <h2>LOGIN</h2>
                    <form onSubmit={login}>
                        <div>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter your Email'
                            required
                        />
                        </div>
                        <div>
                        <input
                            type='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Enter your Password'
                            required
                        />
                        </div>
                        <button className='btn btn-primary' type='submit'>Log In</button>
                    </form>
                    <div className='moveJoin'>
                        <h5>Don't have an account Join Now</h5>
                        <button className='btn btn-dark btn-outline-light' onClick={moveToJoin}>JOIN NOW</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Login
