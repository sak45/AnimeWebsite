import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router";
import { auth } from '../firebase';
import {  signInWithEmailAndPassword   } from 'firebase/auth';

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });


  const navigate = useNavigate();
  const signingUp = () => navigate("/Signup");
  const homePage = () => navigate('/Home');

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
    console.log('what we getting:', e.target.value)
  };

  const logIn = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/Home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            alert('Incorrect details, Please try again')
        });
  }


  return (
    <div className="page-login">
      <h1>Login</h1>
      <div>
        <span className="wrapper-detail">
          <p>Email</p>
          <input
            type="email"
            placeholder="username"
            className="input-detail"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
        </span>
        <span className="wrapper-detail">
          <p>Password</p>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input-detail"
            value={userInfo.password}
            onChange={handleChange}
          />
        </span>
        <p className="sign-up" onClick={signingUp}>
          Don't have an account? Sign Up
        </p>
      </div>
      <button onClick={logIn}>Login</button>
      <button onClick={homePage}>Home</button>
    </div>
  );
}
