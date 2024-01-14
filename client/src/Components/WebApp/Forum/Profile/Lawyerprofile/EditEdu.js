import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "./ProfileStyles.css";
import axios from "axios";
import AppNavbar from '../../../AppNavbar';
import EducationCard from "./EducationCard.js";

const EditEdu = () => {

    const [currDetail, setCurrDetail] = useState([]);
    const [newDetail, setNewDetail] = useState({
        cllg : "",
        percent: "",
        year: ""
    });

    useEffect(() => {
        const fetchDetails = async() => {
            try{
                const response = await axios.get("http://localhost:5000/profile/getProfile", {withCredentials: true});
                setCurrDetail(response.data.edu);
            }catch(error){
                alert("Error loading education details");
            }
        }

        fetchDetails();
    },[setCurrDetail]);

    const handleChange = (e) => {
        const [name, value] = e.target;
        setNewDetail({...newDetail, [name] : value});
    }

    const addEdu = (e) => {
        e.preventDefault();
        try{
            axios
                .post("http://localhost:5000/profile/lsp/update-array", newDetail, {withCredentials: true})
                .then((response) => {
                    if(response.status === 200){
                        window.location.href = "/web/app/profile";
                    }
                })
                .catch((error) => {
                    alert("Error uploading data, try again later");
                    console.log(error);
                });
        }catch(error){
            alert("Error uploading data. Try again later");
            console.log(error);
        }
    }

    const showEduDetails = (details) => {
        return (
            <div>
                {details.map((edu, index) => (
                    <EducationCard key={index} {...edu} />
                ))}
            </div>
        );
    }
    return (
        <div className='row'>
            <div className='col-lg-3'>
                <AppNavbar/>
            </div>
            <div className='col-lg-9'>
                <div className='editEdu'>
                    <h3>Education Details</h3>
                    <form onSubmit={addEdu} className='eduForm'>
                        <h5>Add New Details</h5>
                        <div>
                        <input
                            name='cllg'
                            value={newDetail.cllg}
                            onChange={handleChange}
                            placeholder='Name of Institution'
                        />
                        </div>
                        <div>
                        <input
                            name='percent'
                            value={newDetail.percent}
                            onChange={handleChange}
                            placeholder='Overall Percentage'
                        />
                        </div>
                        <div>
                            <input
                                name='year'
                                value={newDetail.year}
                                onChange={handleChange}
                                placeholder='Year of Passing'
                            />
                        </div>
                        <div>
                            <button className='btn btn-primary' type='submit'>Add Details</button>
                        </div>
                    </form>
                    <br/>
                    <div>
                        {currDetail.length !== 0 ? <h5>Previous Details</h5> : ""}
                        <br/>
                        {currDetail.length !== 0 ? showEduDetails(currDetail) : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEdu
