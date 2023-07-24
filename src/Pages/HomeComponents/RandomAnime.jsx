// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../StylingPages/Home.css";

// export default function RandomAnime() {
//   const [load, setLoad] = useState();
//   const [data, setData] = useState();
//   const [select, setSelected] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await fetch("https://api.jikan.moe/v4/random/anime");
//       const data = await response.json();
//       setData(data.data);
//       console.log(data.data)
//       setLoad();
//     } catch (error) {
//       console.log("shit not working:", error);
//     }
//   };


//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleClick = (genre) => {
//     setSelected(genre === select ? null : genre);
//     console.log('genre:', genre)
//   };

//   console.log(data)

//   return (
//     <div>
//       <h2 className="mostWatched-title">
//         Here's a randomiser to help you find the next Anime to watch
//       </h2>
//       <p className="anime-category-genre">
//         To help you find the right anime select one of the genres.{" "}
//       </p>
//       <ul className="anime-genre-list">
//         <li
//           className={`listed-anime ${select === "Action" ? "show" : ""}`}
//           onClick={() => handleClick("Action")}
//         >
//           Action
//         </li>
//         <li
//           className={`listed-anime ${select === "Comdey" ? "show" : ""}`}
//           onClick={() => handleClick("Comedy")}
//         >
//           Comedy
//         </li>
//         <li
//           className={`listed-anime ${select === "Adventure" ? "show" : ""}`}
//           onClick={() => handleClick("Adventure")}
//         >
//           Adventure
//         </li>
//         <li
//           className={`listed-anime ${select === "Fantasy" ? "show" : ""}`}
//           onClick={() => handleClick("Fantasy")}
//         >
//           Fantasy
//         </li>
//       </ul>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../StylingPages/Home.css";

export default function RandomAnime() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState(null);
  const [select, setSelected] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?genre=${select}`
      );
      const responseData = await response.json();
      setData(responseData.data);
      setLoad(true);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (select) {
      fetchData();
    }
  }, [select]);

  const handleClick = (genre) => {
    setSelected(genre === select ? null : genre);
    console.log('genre:', genre);
  };

  const getRandomAnime = () => {
    if(data && data.length > 0) {
        const randomIndex = Math.floor(Math.random()* data.length)
        return data[randomIndex]
    } 
    return null
  }

  const randomeAnime = getRandomAnime();

  console.log('anime data:', data);

  return (
    <div>
      <h2 className="mostWatched-title">
        Here's a randomiser to help you find the next Anime to watch
      </h2>
      <p className="anime-category-genre">
        To help you find the right anime, select one of the genres.{" "}
      </p>
      <ul className="anime-genre-list">
        <li
          className={`listed-anime ${select === "Action" ? "show" : ""}`}
          onClick={() => handleClick("Action")}
        >
          Action
        </li>
        <li
          className={`listed-anime ${select === "Comedy" ? "show" : ""}`}
          onClick={() => handleClick("Comedy")}
        >
          Comedy
        </li>
        <li
          className={`listed-anime ${select === "Adventure" ? "show" : ""}`}
          onClick={() => handleClick("Adventure")}
        >
          Adventure
        </li>
        <li
          className={`listed-anime ${select === "Fantasy" ? "show" : ""}`}
          onClick={() => handleClick("Fantasy")}
        >
          Fantasy
        </li>
      </ul>
      {load && data && randomeAnime && (
        <div>
          <div>
          <h3 className="random-search" >Random Anime:</h3>
          {data
            .filter((anime) =>
              anime.genres.some((genre) => genre.name === select)
            )
            .slice(0,1)
            .map((anime) => (
              <div key={anime.mal_id} className="random-anime-card">
                <h3 className="random-card-title">{anime.title}</h3>
                <img src={anime.images.jpg.image_url} className="random-card-image" />
                <p className="random-card-description">{anime.synopsis.slice(0, 100)}...</p>
              </div>
            ))}
        </div>
        </div>
      )}
    </div>
  );
}







