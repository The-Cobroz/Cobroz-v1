import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import pic from "../../../../Images/profile-image.png"
import "./ProfileStyles.css";
import PostCardProfile from '../PostCard/PostCardProfile.js';
import axios from 'axios';
import EducationCard from './Lawyerprofile/EducationCard.js';
import ExpCard from './Lawyerprofile/ExpCard.js';
import edit from "../../../../Images/edit.png"

const LawyerProfile = () => {
    const showBroz = false;

    const [details, setDetails] = useState({
        name: "",
        majorIn: "",
        broz: [],
        posts: [],
        exp: [],
        edu: []
    });
    
    useEffect(() => {
        async function getDetails(){
            try{
                const response = await axios.get("http://localhost:5000/profile/getProfile", {withCredentials: true});
                setDetails(response.data);
            }
            catch(error){
                alert("Problem finding your account try again later");
            }
        }

        getDetails();
    }, [setDetails, details])

    const education = (edu) => {
        if(edu.length){
            for(const obj in edu){
                <EducationCard cllg={obj.cllg} percent={obj.percent} year={obj.year}/>
            }
        }
        else{
            return (<div>Add your Education Details here</div>);
        }
    }

    const experience = (exp) => {
        if(exp.length){
            for(const obj in exp){
                <ExpCard cout={obj.court} begin={obj.begin} end={obj.end}/>
            }
        }
        else{
            return (
                <div>Add your Past Experience here</div>
            );
        }
    }
    const queries = (posts) => {
        for(const post in posts){
            <PostCardProfile postID={post}/>
        }
    }

    const Editeducation = () => {
        window.location.href = "/web/app/profile/edit-education";
    }

    const Editexperience = () => {
        window.location.href = "/web/app/profile/edit-experience";
    }

    const broz = () => {

    }
    return (
        <div>
            <div className='row upper'> 
                <div className='col-sm-3 pic'>
                    <img src={pic} alt="Khushaal's pic" />
                </div>
                <div className='col-sm-6'>
                    <h4>{details.name}</h4>
                    <div className='row'>
                        <div className='col-sm-3'>
                            <p className='broz'>{details.posts.length} <strong>queries</strong></p>
                        </div>
                        <div className='col-sm-3'>
                            <p className='broz'>{details.broz.length} <strong>broz</strong></p>
                        </div>
                    </div>
                    <h6>{details.majorIn !== "" ? details.majorIn : ""}</h6>
                </div>
                <div className='col-sm-3'>
                    <p>Redeemable Points: <strong>200</strong></p>
                    <button className='btn btn-primary'>Redeem Points</button>
                </div>
            </div>
            <div className='row'>
            </div>
            <div className='row'>
                <div className='col-sm-4'>
                    <h3>EDUCATION</h3>
                </div>
                <div className='col-sm-6'></div>
                <div className='col-sm-2'>
                    <div className='edit' onClick={Editeducation}>
                        <img src={edit} alt='edit'/>
                    </div>
                </div>
                <div>
                    {education(details.edu)}
                </div>
            </div>
           <div className='row'>
                <div className='col-sm-4'>
                    <h3>EXPERIENCE</h3>
                </div>
                <div className='col-sm-6'></div>
                <div className='col-sm-2'>
                    <div className='edit' onClick={Editexperience}>
                        <img src={edit} alt='edit'/>
                    </div>
                </div>
                <div>
                    {experience(details.exp)}
                </div>
            </div>
            <div className='posts'>
                <h3>{showBroz ? "BROZ" : "QUERIES"}</h3>
                <div>
                    {showBroz ? broz : queries}
                </div>
            </div>
        </div>
    )
}

export default LawyerProfile
