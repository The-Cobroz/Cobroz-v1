import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "./Styles.css";
import symbol from "../Images/cobroz-icon.png"

const Footer = () => {
    return (
        <footer>
            <div className='row'>
                <div className='col-lg-6'>
                    <div className='symbol'>
                        <img src={symbol} alt='Cobroz'/>
                    </div>
                    <div>
                        <p>Copyright ©️Cobroz 2023</p>
                        <p>All Rights Reserved</p>
                        <p><a href='/'>www.cobroz.com</a></p>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='contactFooter'>
                        <p>Contact Us</p>
                        <p>Mail us at: <a href='mailto:team@cobroz.com'>team@cobroz.com</a></p>
                    </div>
                    <div>
                        <p>Follow us at:</p>
                        <p><a href='https://www.instagram.com/cobrozhq'>IG</a></p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
