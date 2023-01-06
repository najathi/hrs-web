import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value })); //using previous value
    //set the password = password.value //creating variable password and setting values 
  }

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" }); //updating loading state
    try {
      const res = await axios.post("/auth/login", credentials);
      console.log(res.data, "type", typeof res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
      navigate("/");
    }
    catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.details });
    }
  }

  return (
    <div className="login">
      <div className="lContainer">
        <Link to="/">
          <h2 className='mb-4 text-align headingText'>Hotel Reservation System</h2>
        </Link>
        <h4 className='text-align'>Customer Login</h4><br />

        <input
          type="text"
          placeholder="username"
          id="username"
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
          Login
        </button>
        {error && <span>{error.message}</span>}

        <br />

        <Link to="/register">Create an account</Link>
      </div>
    </div>
  );
};

export default Login;
