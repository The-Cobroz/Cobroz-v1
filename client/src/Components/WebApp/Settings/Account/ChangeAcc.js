import React from 'react';
import AppNavbar from '../../AppNavbar.js';
import 'bootstrap/dist/css/bootstrap.css';
import "../../Styles.css";
import axios from 'axios';

const ChangeAcc = () => {
    return (
        <div className='row'>
            <div className='col-sm-3'><AppNavbar/></div>
            <div className='col-sm-9'>
                <div>
                    <h4>Change your Account type</h4>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    ) 
}

export default ChangeAcc
