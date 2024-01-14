import React from 'react';
import logo from "../Images/cobroz-removebg-preview.png"
import 'bootstrap/dist/css/bootstrap.css';
import "./Styles.css";

const MainNavbar = () => {
    const register = () => {
        window.location.href = "/auth/register";
    };

    const login = () => {
        window.location.href = "/auth/login";
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <img src={logo} alt='Cobroz' className='navbar-brand logo' onClick={() => {window.location.href = "/"}}/>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/aboutus">AboutUs</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/services">Services</a>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link" href="/contact">
                        Contact
                    </a>
                    </li>
                </ul>
                </div>
                <div className='auth'>
                    <button className='btn btn-dark' onClick={register}>Join Now</button>
                    <button className='btn btn-light' onClick={login}>Log In</button>
                </div>
            </div>
        </nav>
    )
}

export default MainNavbar;
