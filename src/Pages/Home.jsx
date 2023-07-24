import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Navbar from "./Navbar";
import { ButtonAppBar } from "./Navbar";
import "../StylingPages/Home.css";
import FirstSection from "./HomeComponents/FirstSection";
import RandomAnime from "./HomeComponents/RandomAnime";

export default function Home() {
  const [load, setLoad] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const videoId = '53_QT4NSB48';
  const src = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div>
      {load && (
        <div className="home-body">
          <Navbar user={user} />
          <main className="main-content">
            <div className="latest-anime">
              <h2 className="mostWatched-title">
                The latest trend for Bleach: Thousand-Year Blood war Part 2 has
                been released
              </h2>
              <iframe src={src} frameBorder="0" width='100%' height='200'></iframe>
            </div>
            <h2 className="mostWatched-title">Highest voted Anime in: 2023</h2>
            <p className="mostWatched-text">
              In 2023, the highest voted anime captivated fans worldwide. With
              its stunning animation and captivating storyline, this masterpiece
              left an indelible mark. It weaved adventure, romance, and suspense
              into a visually stunning world.
            </p>
            <RandomAnime />
            <FirstSection user={user} />
          </main>
        </div>
      )}
    </div>
  );
}
