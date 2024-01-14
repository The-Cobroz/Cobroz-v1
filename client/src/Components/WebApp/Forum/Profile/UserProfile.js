import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import pic from "../../../../Images/profile-image.png"
import "./ProfileStyles.css";
import PostCardProfile from '../PostCard/PostCardProfile.js';
import axios from 'axios';

const UserProfile = () => {
    var showBroz = false;

    const openPost = () => {
        window.location.href = "/web/app/post/$id"
    }

    const [details, setDetails] = useState({
        name: "",
        posts: [],
        broz: []
    });
    
    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get("http://localhost:5000/profile/getProfile", {withCredentials: true});
                setDetails(response.data);
            }
            catch(error){
                console.error();
            }
        };

        fetchData();
    });

    const broz = (people) => {
        // people.map((broID) => {
            
        // })
    };

    const queries = (posts) => {
        posts.map((post) => {
            return(
                <div onClick={openPost}>
                    <PostCardProfile postID={post}/>
                </div>
            )
        })
    };

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
                </div>
                <div className='col-sm-3'>
                    <p>Redeemable Points: <strong>200</strong></p>
                    <button className='btn btn-primary'>Redeem Points</button>
                </div>
            </div>
            <div className='posts'>
                <h3>{showBroz ? "BROZ" : "QUERIES"}</h3>
                <div>
                    {showBroz ? broz(details.broz) : queries(details.posts)}
                </div>
            </div>
        </div>
    )
}

export default UserProfile;
