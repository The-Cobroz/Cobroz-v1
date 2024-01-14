import React, { useEffect, useState } from 'react'
import AppNavbar from '../../AppNavbar.js';
import 'bootstrap/dist/css/bootstrap.css';
import "../../Styles.css";
import EditLawyer from './EditLawyer.js';
import EditUser from './EditUser.js';

const EditPersonal = () => {

    const [lawyer, setLawyer] = useState(true);
    const [userId, setUserId] = useState(null);

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
                }

                if(trimmedName === "logged"){
                    setUserId(trimmedValue);
                }
            }
        }

        checkCookies();
    }, []); // Removed setLawyer from the dependency array to prevent unnecessary re-renders

    return (
        <div className='row'>
            <div className='col-sm-3'>
                <AppNavbar/>
            </div>
            <div className='col-sm-9 settings'>
                {lawyer ? <EditLawyer userID = {userId} /> : <EditUser userID = {userId} /> }
            </div>
        </div>
    )
}

export default EditPersonal;
