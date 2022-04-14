import React from "react";
import './Header.css';
import logo from '../../netflixlogo.png'
import userlogo from '../../userlogo.png'

export default ({black}) => {
    return(
    <header className={black ? 'black' : ''}>
        <div className="header--logo">
            <a href="/">
                <img src={logo} />
            </a>
        </div>
        <div className="header--user">
            <a href="">
                <img src={userlogo} />
            </a>
        </div>
    </header>
    );
}