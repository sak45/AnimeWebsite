import React, { useState } from "react";
import "../../StylingPages/Setting.css";
import { updateEmail, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Emailinfo({ user }) {
  const [load, setLoad] = useState(true);
  const [userInfo, setUserInfo] = useState({
    email: "",
    emailTwo: "",
    currentPassword: ''
  });

  const navigate = useNavigate();

  const newEmail = async (e) => {
    e.preventDefault();
    try {
      const credential = EmailAuthProvider.credential(user.email, userInfo.currentPassword);

      await reauthenticateWithCredential(auth.currentUser, credential);

      await updateEmail(auth.currentUser, userInfo.email);

      if (userInfo.email === userInfo.emailTwo && userInfo.email.length > 0) {
        navigate("/Setting");
        setLoad(false);
      } else {
        console.log("in here");
      }
    } catch (error) {
      console.log("Error updating email:", error);
    }
  };

  function handleChange(e) {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  }

  console.log('whats the email', user)

  return (
    <>
      {load ? (
        <div className="sub-listed">
          <p className="sub-text">Enter New email</p>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            id="email"
            className="sub-input"
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="email"
            name="emailTwo"
            value={userInfo.emailTwo}
            id="emailTwo"
            className="sub-input"
            onChange={handleChange}
            placeholder="Confirm email"
          />
          <input
            type="password"
            name="currentPassword"
            value={userInfo.currentPassword}
            id="password"
            className="sub-input"
            onChange={handleChange}
            placeholder="Current password"
          />
          <button className="sub-btn" onClick={newEmail}>
            Save
          </button>
        </div>
      ) : (
        <div className="sub-listed">
          <p className="sub-text">Email has been updated</p>
        </div>
      )}
    </>
  );
}

