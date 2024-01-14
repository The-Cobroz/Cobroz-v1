import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../../Styles.css";
import axios from 'axios';


const EditUser = (userID) => {

    const [details, setDetails] = useState({
        name: "",
        email: ""
    })    
    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get("http://localhost:5000/profile/getProfile", {withCredentials: true});
                const prevDet = {
                    name: response.data.name,
                    email: response.data.email
                };

                setDetails(prevDet);
            }
            catch(error){
                alert("Erroring finding details, try again later");
            }
        };

        fetchData();
    })

    const [edit, setEdit] = useState({
        name: details.name,
        email: details.email
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEdit({...edit, [name]: value});
    }

    const saveChanges = (e) => {
        e.preventDefault();
        try{
            axios
                .put("http://localhost:5000/profile/lsp/update", edit, {withCredentials: true})
                .then(response => {
                    if(response.status === 200){
                        alert("Changes Saved");
                        window.location.href = "/web/app/settings";
                    }
                    else{
                        alert("Error saving details, try again later");
                    }
                })
                .catch(error => {
                    alert("Error saving changes");
                })
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <h4>Edit Your Personal Information</h4>
            <form onSubmit={saveChanges}>
                <h6>Change your name</h6>
                <div>
                    <input
                        name='name'
                        value={edit.name}
                        type='text'
                        placeholder={" "+details.name}
                        onChange={handleChange}
                    />
                </div>
                <h6>Change your email</h6>
                <div>
                    <input
                        name='email'
                        value={edit.email} 
                        type='email'
                        placeholder= {" "+details.email}
                        onChange={handleChange}
                    />
                </div>
                <button className='btn btn-outline-success' type='submit'>Save Changes</button>
            </form>
        </div>
    )
}

export default EditUser;
