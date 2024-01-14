import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import edu from "../../../../../Images/deg.png";
import "../ProfileStyles.css";
import "./ProfileStyles.css";

const EducationCard = ({cllg, percent, year}) => {
    return(
        <div className='deg'>
            <div className='row'>
                <div className='col-lg-2'>
                    <div className='deg-sym'>
                        <img src={edu} alt='edu'/>
                    </div>
                </div>
                <div className='col-lg-10'>
                    <h5>{cllg}</h5>
                    <h6>Overall Percentage: {percent} %</h6>
                    <h6>Year of Passing: {year}</h6>
                </div>
            </div>
        </div>
    )
}

export default EducationCard
