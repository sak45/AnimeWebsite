import React, { useState } from "react";
import "../../StylingPages/Setting.css";
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Password({ user }) {
  const [load, setLoad] = useState(true);
  const [userInfo, setUserInfo] = useState({
    currentPassword: "",
    password: "",
    passwordTwo: "",
  });

  const navigate = useNavigate();

  const newPassword = async (e) => {
    e.preventDefault();
    try {
      const credential = EmailAuthProvider.credential(user.email, userInfo.currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);

      await updatePassword(auth.currentUser, userInfo.password);

      if (
        userInfo.password === userInfo.passwordTwo &&
        userInfo.password.length > 0
      ) {
        navigate("/Setting");
        setLoad(false);
      } else {
        console.log("error 1");
      }
    } catch (error) {
      console.log("error 2:", error);
    }
  };

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {load ? (
        <div className="sub-listed">
          <p className="sub-text">Enter New Password</p>
          <input
            type="password"
            name="currentPassword"
            value={userInfo.currentPassword}
            id="email"
            className="sub-input"
            onChange={handleChange}
            placeholder="Current Password"
          />
          <input
            type="password"
            name="password"
            value={userInfo.password}
            id="password"
            className="sub-input"
            onChange={handleChange}
            placeholder="New Password"
          />
          <input
            type="password"
            name="passwordTwo"
            value={userInfo.passwordTwo}
            id="passwordTwo"
            className="sub-input"
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          <button className="sub-btn" onClick={newPassword}>
            Save
          </button>
        </div>
      ) : (
        <div className="sub-listed">
          <p className="sub-text">Password has been updated</p>
        </div>
      )}
    </>
  );
}
