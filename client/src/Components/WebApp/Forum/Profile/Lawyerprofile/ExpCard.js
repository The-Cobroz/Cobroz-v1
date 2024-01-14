import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "../ProfileStyles.css";
import exp from "../../../../../Images/exp.jpg";
import "./ProfileStyles.css";

const ExpCard = ({court, begin, end}) => {
    return(
        <div className='deg'>
            <div className='row'>
                <div className='col-lg-2'>
                    <div className='deg-sym'>
                        <img src={exp} alt='exp'/>
                    </div>
                </div>
                <div className='col-lg-10'>
                    <h5>{court}</h5>
                    <h6>Duration: {begin} - {end}</h6>
                </div>
            </div>
        </div>
    )
}

export default ExpCard;
