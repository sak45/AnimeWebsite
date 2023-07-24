import React, { useState, useEffect } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import "../../StylingPages/Home.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { collection, addDoc } from "firebase/firestore";
import {dataBase} from '../../firebase';
import useStore from '../../indexZustand'; 

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function FirstSection({ user }) {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggleLikedIndex = useStore((state) => state.toggleLikedIndex);
  const likedIndices = useStore((state) => state.likedIndices);


  

  const handleExpandClick = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };


   const fetchData = async () => {
    try {
      const response = await fetch("https://api.jikan.moe/v4/top/anime");
      const data = await response.json();
      // in here we created a new property called isFavourite this property was initialized with false to show that user has not selected a
      // a favourite, the setData(newData) updates the rendering ui and includes it. 
      const newData = data.data.map((elem) => ({
        ...elem, isFavourite: false
      }))
      setData(newData);
      useStore.setState({ data: newData });
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="horizontal-scroll">
      {data.length > 0 &&
        data.slice(0, 8).map((anime, index) => (
          <Card sx={{ minWidth: 230, height: expandedIndex === index ? 'auto' : 270 }} key={anime.title}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="anime image"
                image={anime.images.jpg.image_url}
                height="140"
              />
              <div className="anime-detail">
                <p className="anime-title2">{anime.title_english}</p>
                <Rating
                  name="half-rating-read"
                  className="stars"
                  defaultValue={anime.score / 2}
                  precision={0.1}
                  readOnly
                />
              </div>
            </CardActionArea>
            <CardActions disableSpacing>
              <IconButton style={{color: likedIndices.includes(index) ? "red": "lightgrey"}} aria-label="add  to favorites"  
                onClick={() => toggleLikedIndex(index)}
              >
                <FavoriteIcon   />
              </IconButton>
              <ExpandMore
                expand={expandedIndex === index}
                onClick={() => handleExpandClick(index)}
                aria-expanded={expandedIndex === index}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse
              in={expandedIndex === index}
              timeout="auto"
              unmountOnExit
            >
              <CardContent id="boxPart2">
                <p className="anime-title2">Anime Details</p>
                <div className="extra-details">
                <p className="anime-title2">Rank:   {anime.rank}</p>
                <p className="anime-title2">Episodes:   {anime.episodes}</p>
                <p className="anime-title2">Genres: {' '}
                    {anime.genres
                    .map((element) => element.name).join(', ')
                    }
                </p>
                </div>
              </CardContent>
            </Collapse>
          </Card>
        ))}
    </div>
  );
}


// Code below shows that the moment is favourite is selected the code changes to red as it becomes true. 
// now the setData, copies the array and creates a new one ending it witht the selected anime. 
// it updates the selected the data array to check that selected anime has not been selected before and if it has been selected again it will
// remove itself from the array. now we can see that the data array has been copied and created a new one with the selected anime included.


// <IconButton style={{color: anime.isFavourite ? "red": "lightgrey"}} aria-label="add  to favorites" onClick={() => {
//                 console.log("data: ", data, index)
//                     setData([...data.slice(0, index), {...data[index], isFavourite: !data[index].isFavourite} ,...data.slice(index + 1)])
//               }} ></IconButton>