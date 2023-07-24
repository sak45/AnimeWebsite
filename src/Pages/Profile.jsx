import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../StylingPages/Home.css";
import useStore from "../indexZustand";

export default function Profile() {
  const [load, setLoad] = useState(true);
  const likedIndices = useStore((state) => state.likedIndices);
  const data = useStore((state) => state.data);

  console.log("what we got in here:", data);

  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  return (
    <div>
      {load && (
        <div className="home-body">
          <Navbar user={user} />
          <h2 className="profile-signing">
            Hi {user.displayName},
            Thank you for signing up to LinkUp, the best website to find the
            latest anime episodes and manga.
          </h2>
          <h3 className="profile-liked-animes">Here are your liked anime</h3>
          <div className="profile-cards">
            {likedIndices.map((index) => {
              const anime = data[index];
              // Add a conditional check for the 'images' property
              if (
                anime &&
                anime.images &&
                anime.images.jpg &&
                anime.images.jpg.image_url
              ) {
                return (
                  <div className="profile-card" key={anime.title}>
                    <img src={anime.images.jpg.image_url} alt="anime" />
                    <div className="card-content">
                      <h2>{anime.title_english}</h2>
                      <p className="synopsis">{anime.synopsis}</p>
                    </div>
                  </div>
                );
              } else {
                return null; // Handle the case where the 'images' property is undefined
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}
