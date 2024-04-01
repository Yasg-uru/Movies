import axios from "axios";
import React, { useEffect } from "react";
import "./Getsavedmovies.css";
import Rating from "react-rating-stars-component"
const Getsavedmovies = () => {
  const fakeSavedMovies = [
    {
      _id: "65a75c2a9afe0a9b4c8eab83",
      title: "The Social Network",
      description: "This is the most motivating movie",
      imageurl:
        "D:\\fullstackwebdevcourse\\movie watching system\\backend projects\\backend\\middleware\\temporary\\another.jpg",
      vediourl:
        "D:\\fullstackwebdevcourse\\movie watching system\\backend projects\\backend\\middleware\\temporary\\adhar card papa-compressed.jpg",
      views: 5000,
      savedbyusers: [],
      overallrating: 0,
      comments: [],
      ratings: [],
      __v: 0,
    },
    {
      _id: "123456789",
      title: "Inception",
      description: "A mind-bending thriller",
      imageurl: "https://example.com/inception.jpg",
      vediourl: "https://example.com/inception.mp4",
      views: 1278,
      savedbyusers: [],
      overallrating: 0,
      comments: [],
      ratings: [],
      __v: 0,
    },
    {
      _id: "987654321",
      title: "The Shawshank Redemption",
      description: "A classic tale of hope and redemption",
      imageurl: "https://example.com/shawshank-redemption.jpg",
      vediourl: "https://example.com/shawshank-redemption.mp4",
      views: 100,
      savedbyusers: [],
      overallrating: 0,
      comments: [],
      ratings: [],
      __v: 0,
    },
    // Add more movie objects if needed
  ];
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/getallsavedmovie",
        {
          withCredentials: true,
        }
      );
      const { savedmovies } = response.data;
      console.log("saved movies:" + typeof savedmovies);
    } catch (error) {
      console.log("error is occured");
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="saved-movies-container">
       
      <div className="saved-movies-inner-container">
        {/* <div></div> */}
        {fakeSavedMovies.map((item) => (
          <div className="saved-movies-container-div">
            <img style={{height:'168px'}} src="https://res.cloudinary.com/duzmyzmpa/image/upload/v1704862806/jutp7gpczbhd0icty7us.jpg" alt="" />
            <p style={{color:'white'}}>Name:{item.title}</p>
            <p style={{color:'white'}}>Views:{item.views}</p>
            <Rating
        count={5}
        
        size={24}
        activeColor="cyan"
        value={item.ratings}
        edit={false}
      />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Getsavedmovies;
