import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import "../../StylingPages/Setting.css";

export default function PhoneNum({ user }) {
  const [userInfo, setUserInfo] = useState({
    number: '',
  });
  const [load, setLoad] = useState(true);

  const navigate = useNavigate();

  const updateNewNum = async (e) => {
    e.preventDefault();
    try {
        
      await updateProfile(auth.currentUser, {
        phoneNumber: userInfo.number,
      });

      if (userInfo.number.length) {
        navigate("/Setting");
        setLoad(false);
      }
    } catch (error) {
      console.log("show error: ", error);
    }
  };

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  console.log("PhoneNumber", user['phoneNumber']);

  return (
    <>
      {load ? (
        <div className="sub-listed">
          <p className="sub-text">Enter New Phone Number</p>
          <input
            type="number"
            id=""
            className="sub-input"
            value={userInfo.number}
            name="number"
            onChange={handleChange}
            placeholder="+44"
          />
          <button className="sub-btn" onClick={updateNewNum}>Save</button>
        </div>
      ) : (
        <div className="sub-listed">
          <p className="sub-text">Phone number has been updated</p>
        </div>
      )}
    </>
  );
}
