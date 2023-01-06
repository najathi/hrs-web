import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value })); //using previous value
    //set the password = password.value //creating variable password and setting values 
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/customer/register", credentials);
      if (res) {
        setLoading(false);
        navigate("/login");
      }
    }
    catch (err) {
      console.log(err.response.details)
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <div className="lContainer">
      <Link to="/">
          <h2 className='mb-4 text-align headingText'>Hotel Reservation System</h2>
        </Link>
        <h4 className='text-align'>Create an Account</h4><br />

        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          placeholder="E-Mail Address"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Register
        </button>
        <br />

        <Link to="/login">Already have an account</Link>
      </div>
    </div>
  );
};

export default Register;
