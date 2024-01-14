import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AppNavbar from '../../AppNavbar.js';
import LawyerProfile from './LawyerProfile.js';
import UserProfile from './UserProfile.js';

const ProfilePage = () => {

    const [lawyer, setLawyer] = useState(true);
    
    useEffect(() => {
        async function checkCookies() {
            const cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                // Use cookies[i] instead of cookie, and split it to get the name and value
                const [name, value] = cookies[i].split("=");

                // Trim spaces from name and value
                const trimmedName = name.trim();
                const trimmedValue = value.trim();

                if (trimmedName === "type" && trimmedValue !== "lawyer") {
                    // Use setLawyer instead of modifying the state directly
                    setLawyer(false);
                    break;
                }
            }
        }

        checkCookies();
    }, []);

    return (
        <div className='row'>
            <div className='col-sm-3'>
                <AppNavbar/>
            </div>
            <div className='col-sm-9'>
                {lawyer ? <LawyerProfile/> : <UserProfile/>}
            </div>
        </div>
    );
}

export default ProfilePage;
