import React from 'react';
import "../../Styles.css";
import axios from 'axios';
import profile from "../../../../Images/profile-image.png";

const PaymentAlert = () => {
    return(
        <div className='row notification'>
            <div className='col-sm-1'></div>
            <div className='col-sm-11 notif-text'>
                <h6>You have made X connections over d1 - d2. Your commission fee for it is ₹Y. Click to pay</h6>
            </div>
        </div>
    )
}

export default PaymentAlert
