import React, { useState, useMemo } from "react";
import axios from 'axios';
import "../Signup/signup.css";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { countries } from 'countries-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function Signup() {

const [selectedCountry, setSelectedCountry] = useState(null);
const [dateOfBirth, setDateOfBirth] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [isChecked, setIsChecked] = useState(false);



const handleDateChange = (event) => {
setDateOfBirth(event.target.value);
};

// Transform country data into options format for react-select
const countryOptions = Object.keys(countries).map((countryCode) => ({
value: countryCode,
label: `${countries[countryCode].name} (+${countries[countryCode].phone})`,
}));

const togglePasswordVisibility = () => {
setShowPassword(!showPassword);
};

const handleCheckboxChange = (e) => {
setIsChecked(e.target.checked);
};

return (
<>
    <div className="login-center">
        <div className="start">
            <h2 className="email-h2">Create your personal Account</h2>
            <p className="register-p">You are about to create your account. This will allow us to offer you a
                personalized and tailored experience both online and in-store, provide you with products, services and
                information you request
                from us, communicate with you, and give you access to exclusive services and benefits reserved for
                registered members to the PRADA Group customer database.</p>

            <p className="mandatory-fields">Mandatory fields *</p>

            <div className="register-div-fname-lname">
                <input type="text" id="fname" name= "fname" placeholder="Fisrt Name *" className="fname"
                    required></input>

                <input type="text" id="lname" name= "lname" placeholder="Last Name *" className="lname"
                    required></input>
            </div>

            <div className="register-country-phone">
                <div className="country-select">
                    <Select options={countryOptions} value={selectedCountry} onChange={(selectedOption)=>
                        setSelectedCountry(selectedOption)}
                        placeholder="Select country"
                        classNamePrefix="react-select"
                        className="country-code"
                        />
                </div>

                <span className="cross">|</span>
                <input type="text" placeholder="Phone number *" className="phone-input" />
            </div>

            <div className="register-div-fname-lname">
                <input type="date" id="dateOfBirth" name="dateOfBirth" value={dateOfBirth}
                    onChange={handleDateChange} className="dob" max={new Date().toISOString().split('T')[0]} required />
            </div>

            <div className="password-charac">
                <div className="register-div-password">
                    <input type={showPassword ? "text" : "password" } id="password" name="password"
                        placeholder="Password *" className="password" required />
                    <span className="toggle-password" onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                </div>
                <p className="pass-characters">The password must be composed of 8 to 16 characters</p>
            </div>

            <div>
                <input type="checkbox" id="agree" name="checkbox" onChange={handleCheckboxChange}
                    className="agreement" required />
                <label htmlFor="agree">
                    <span className="custom-checkbox"></span>
                    <span className="label-agree">
                        I agree to receive (by email and other forms of electronic communication) commercial
                        communications, including marketing and promotional messages, newsletter, advertising and
                        catalogues concerning Kyveli and the other brands, products and services of the Kyveli Group.
                    </span>
                </label>
            </div>

            <div>
                <p className="understood">By clicking on “Register”, you confirm that you have read and understood our
                    Privacy Statement, you are over 16 years of age and that you want to register.</p>
            </div>

            <div className="register-div-fname-lname">
                <button className="register-button">Register</button>
            </div>

        </div>
    </div>
</>
);
}

export default Signup;
