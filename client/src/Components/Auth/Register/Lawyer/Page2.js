import React, {useState} from 'react'
import MainNavbar from '../../../MainNavbar.js';
import Footer from '../../../Footer.js';
import "../../Styles.css";
import "../../../Styles.css";
import axios from 'axios';


const Page2 = () => {

    const [details, setDetails] = useState({
        barid : "",
        sbc : ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDetails({...details, [name]: value});
    }

    const register = (e) => {
        e.preventDefault();
        try{
            axios   
                .post("http://localhost:5000/auth/register/lsp/page-2", details)
                .then(response => {
                    if(response.status === 200){
                        window.location.href = "/web/app";
                    }
                    else if(response.status === 205){
                        alert("Someone else is registerd with this barID");
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
                    <h2>SIGN UP</h2>
                    <h3>Lawyer Account</h3>
                    <h3>Verfication details</h3>
                    <form onSubmit={register}>
                        <div>
                            <input
                                type='text'
                                name='barid'
                                value={details.barid}
                                onChange={handleChange}
                                placeholder='Enter your BarID'
                                required
                            />
                        </div>
                        <div>
                            
                        </div>
                        <div>
                            <label>Certificate of Practice</label>
                            <input
                                type='file'
                                name='cop'
                                required
                            />
                        </div>
                        <div>
                            <label>Degree of Law</label>
                            <input
                                type='file'
                                name='deg'
                                required
                            />
                        </div>
                        <button className='btn btn-primary' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Page2
