import React from "react";
import "./Movieboxes.css";
import Rating from "react-rating-stars-component"
import {Link} from "react-router-dom"
function Movieboxes({ movie}) {
  const { title, views, ratings, imageurl,_id } = movie;

  return (
    <div className="card-container">
      <img src={'https://tse3.mm.bing.net/th?id=OIP.xU3TPXoDbaPxRwp_EO8__QHaEK&pid=Api&P=0&h=180'} alt={title} className="movie-image" />
      <div className="movie-details">
        <div className="detail-content-container">
          <h2 className="movie-title">{title}</h2>
          <p className="movie-views">Views: {views}</p>
          {/* <p className="movie-ratings">Ratings: {ratings}</p> */}
          <Rating
        count={5}
        value={ratings}
        size={24}
        edit={false} // Set to true if you want to enable user editing
      />

          <Link to={`/getdetails/${_id}`}>
          <button className="details-button">
            
            Get Details
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Movieboxes;
