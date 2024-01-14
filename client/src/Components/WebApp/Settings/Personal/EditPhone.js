import React, { useEffect, useState } from 'react'
import AppNavbar from '../../AppNavbar.js';
import 'bootstrap/dist/css/bootstrap.css';
import "../../Styles.css";
import axios from 'axios';


const EditPhone = () => {

    const [prevPhone, setPrevPhone] = useState(0);
    const [phone, setPhone] = useState(null);
    const [otp, setOtp] = useState(null);
    const [click, setClick] = useState(0);

    useEffect(() => {
        const fetchPhone = async() => {
            try{
                const response = await axios.get("http://localhost:5000/profile/getProfile", {withCredentials: true});
                if(response.status === 200){
                    setPrevPhone(response.data.phone);
                }
                else{
                    alert("Error fetching details");
                }
            }
            catch(error){
                alert("Error connecting to server, try again later");
            }
        }

        fetchPhone();
    },[])

    const handleClick = (e) => {
        e.preventDefault();
        if(click === 0){
            
        }
    }


    return (
        <div className='row'>
            <div className='col-sm-3'>
                <AppNavbar/>
            </div>
            <div className='col-sm-9 settings'>
                <div>
                    <h4>Edit your Phone Number</h4>
                    <div>
                        <input
                            type='number'
                            name='phone'
                            placeholder="+91"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type='number'
                            name='otp'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            disabled
                            placeholder='Enter OTP'

                        />
                    </div>
                    <button className='btn btn-outline-success' onClick={handleClick}>Save Changes</button>
                </div>
            </div>
        </div>
    )
}

export default EditPhone
