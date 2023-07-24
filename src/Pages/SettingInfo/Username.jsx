import React, { useState } from "react";
import "../../StylingPages/Setting.css";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { NavLink, useNavigate } from "react-router-dom";

export default function Username({ user }) {
  const [load, setLoad] = useState(true);
  const [newName, setNewName] = useState({
    username: "",
  });

  const navigate = useNavigate();

  const newDisplayName = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: newName.username,
      });

      if (newName.username.length > 0) {
        navigate("/Setting");
        setLoad(false);
      }
    } catch (error) {
      console.log("what went wrong", error);
    }
  };

  function handleChange(e) {
    setNewName({
      ...newName,
      [e.target.name]: e.target.value,
    });
  }

  console.log("display name change", user);

  return (
    <>
      {load ? (
        <div className="sub-listed">
          <p className="sub-text">Enter New Username</p>
          <input
            type="text"
            name="username"
            value={newName.username}
            id=""
            className="sub-input"
            placeholder="New Username"
            onChange={handleChange}
          />
          <button className="sub-btn" onClick={newDisplayName}>
            Save
          </button>
        </div>
      ) : (
        <div className="sub-listed">
          <p className="sub-text">Username has updated</p>
        </div>
      )}
    </>
  );
}
