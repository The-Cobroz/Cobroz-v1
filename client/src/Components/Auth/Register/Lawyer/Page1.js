import React, {useState} from 'react';
import MainNavbar from '../../../MainNavbar.js';
import Footer from '../../../Footer.js';
import "../../Styles.css";
import "../../../Styles.css";
import axios from 'axios';
const Page1 = () => {

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
                    .post("http://localhost:5000/auth/register/lsp/page-1", formData)
                    .then(response => {
                        if(response.status === 200){
                            window.location.href = "/auth/register/lsp/page-2";
                        }
                        else if(response.status === 205){
                            alert("User with this email id already exists");
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
                    <h3>Lawyer Account</h3>
                    <h3>Personal Information</h3>
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
                                type='passowrd'
                                name='cnfmPassword'
                                value={account.cnfmPassword}
                                placeholder='Confirm your password'
                                onChange={handleChange}
                                required
                            />
                        </div>          
                        <button className='btn btn-primary' type='submit'>NEXT STEP</button>    
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Page1
