import React from 'react'
import MainNavbar from '../../MainNavbar.js'
import Footer from '../../Footer.js';
import client from "../../../Images/client.png";
import lawyer from "../../../Images/lawyer.png";
import 'bootstrap/dist/css/bootstrap.css';
import "../../Styles.css";
import "../Styles.css";

const LspRegister = () => {

    const clientRegister = () => {
        window.location.href = "/auth/register/user";
    }

    const lawyerRegister = () => {
        window.location.href = "/auth/register/lsp/page-1";
    }
    return (
        <>
            <MainNavbar/>
            <div className='bg'>
                <div className='inner register'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <img src={client} alt='Client'/>
                        </div>
                        <div className='col-lg-6 text'>
                            <h4>Got a legal query?</h4>
                            <h4>Join us now with a client profile and get solution to your problems by experienced and highly qualified lawyers</h4>
                            <h5>Click here</h5>
                            <button className='btn btn-primary' onClick={clientRegister}>JOIN NOW</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-6 text'>
                            <h4>Facing problem getting new clients?</h4>
                            <h4>Want to create your online presence?</h4>
                            <h4>Join us now as a lawyer and help people with their legal queries</h4>
                            <h5>Click here</h5>
                            <button className='btn btn-primary' onClick={lawyerRegister}>JOIN NOW</button>
                        </div>
                        <div className='col-lg-6'>
                            <img src={lawyer} alt='lawyer'/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default LspRegister
