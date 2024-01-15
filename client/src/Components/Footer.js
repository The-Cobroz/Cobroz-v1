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
                        <p><a href='https://www.instagram.com/cobrozhq'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a> <a href='https://www.linkedin.com/company/cobroz'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a></p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
