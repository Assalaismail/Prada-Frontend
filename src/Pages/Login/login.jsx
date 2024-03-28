import React, { useState } from "react";
import axios from 'axios';
import "../Login/login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faHeart,
    faPhone,
    faBagShopping,
} from '@fortawesome/free-solid-svg-icons';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [showSecondForm, setShowSecondForm] = useState(false);
    const [showFirstForm, setShowFirstForm] = useState(true);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const checkAccount = async () => {
        const formData = new FormData();
        formData.append("email", email);
        try {
            const response = await axios.post("http://localhost:8000/api/check-account", formData);
            const { data, message } = response.data;
            if (data === true) {
                setShowSecondForm(true);
                setShowFirstForm(false);
            } else {
                window.location.href = "/register";
            }
        } catch (error) {
            setError("An error occurred while checking the account.");
        }
    };

    return (
        <>
            <div className="login-center">
                    {showFirstForm && (
                        <div className="start">
                            <h2 className="email-h2">Enter your Email</h2>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="E-mail address *"
                                className="email-input"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            <button className="next-button" onClick={checkAccount}>Next</button>
                            <hr className="hr-email" />
                        </div>
                    )}

                    {showSecondForm && (
                        <div className="start">
                            <h2 className="email-h2">Enter your Password</h2>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password *"
                                className="email-input"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            <button className="next-button" onClick={checkAccount}>Next</button>
                            <hr className="hr-email" />
                        </div>
                    )}

                    <p className="p-text">Enjoy a unique shopping experience with your personal account</p>

                    <div className="icons-login">
                        <i className="icon-login">
                            <FontAwesomeIcon icon={faUser} /> <span className="text-icon"> Check the details and monitor the
                            status of your orders and
                            returns</span>
                        </i>

                        <i className="icon-login">
                            <FontAwesomeIcon icon={faHeart} />
                            <span className="text-icon"> Create a wishlist to save your favorite items</span>
                        </i>

                        <i className="icon-login">
                            <FontAwesomeIcon icon={faBagShopping} />
                            <span className="text-icon"> View your private appointments and repairs requests</span>
                        </i>

                        <i className="icon-login">
                            <FontAwesomeIcon icon={faPhone} />
                            <span className="text-icon"> Receive tailored assistance from our Client Service</span>
                        </i>
                    </div>
                </div>

        </>
    );
}

export default Login;
