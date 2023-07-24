import react, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: ''
  });
  const navigate = useNavigate();

  const userActive = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password,
        userInfo.phoneNumber
      );
      await updateProfile(auth.currentUser, {
        displayName: userInfo.username,
      });

      if (userInfo.email.length && userInfo.password.length > 0) {
        navigate("/Home");
      } 

      console.log(user);
    } catch (error) {
      
      if (userInfo.email  === '') {
        console.log('erro retrddr ', error)
        alert('please enter email');
      } else if (userInfo.password === '') {
        alert('Please enter a password')
      } else if (userInfo.email !== '') {
        alert('Email already exists please Sign in')
      } 

    }

  };

  // next thing to do: when pressed the register button ensure that

  function handleChange(e) {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="page-login">
      <h1>Sign Up</h1>
      <div className="form">
        <span className="wrapper-detail">
          <p>Username</p>
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="input-detail"
            value={userInfo.username}
            onChange={handleChange}
          />
        </span>
        <span className="wrapper-detail">
          <p>Email</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-detail"
            value={userInfo.email}
            onChange={handleChange}
          />
        </span>
        <span className="wrapper-detail">
          <p>Password</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-detail"
            value={userInfo.password}
            onChange={handleChange}
          />
        </span>
      </div>
      <button className="btn" onClick={userActive}>
        Register
      </button>
    </div>
  );
}
