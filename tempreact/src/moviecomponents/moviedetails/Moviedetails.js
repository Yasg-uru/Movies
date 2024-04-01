import { Link, useParams } from "react-router-dom";
import "./Moviedetails.css";
import Rating from "react-rating-stars-component";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../LOADER/Loader.js";
import copy from "clipboard-copy"
function Moviedetails() {
  const [loading, setLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [data, setdata] = useState({
    Title: "",
    Description: "",
    Imageurl: "",
    Views: "",
    Overallrating: "",
    Comments: [],
    Vediourl: "",
  });
  const { id } = useParams();
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/movie/detail/${id}`
      );
      const {
        title,
        description,
        imageurl,
        views,
        overallrating,
        comments,
        vediourl,
      } = response.data.moviesdetail;

      setdata({
        Title: title,
        Description: description,
        Imageurl: imageurl,
        Views: views,
        Overallrating: overallrating,
        Comments: comments,
        Vediourl: vediourl,
      });
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log("error is ocuured" + error);
    }
  };

  const handleCopyClick = async (textToCopy) => {
    try {
      await copy(textToCopy);
      setIsCopied(true);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, [id]);

  const [text, settext] = useState("");

  const handlecommentsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/api/movie/addcomment/${id}`,
        {
          text,
        },
        { withCredentials: true }
      );
      settext("");
      console.log("response of the comment api is " + response.data);
    } catch (error) {}
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="movie-detail-main-container">
        <div className="movie-title-container">
          <h1
            className="movie-heading"
            style={{
              textAlign: "center",
              color: "white",
              textDecoration: "underline",
              letterSpacing: "10px",
            }}
          >
            {/* The Social Network */}
            {data.Title}
          </h1>
        </div>
        <div className="movie-image-conatainer">
          <img
            src="https://res.cloudinary.com/duzmyzmpa/image/upload/v1704862806/jutp7gpczbhd0icty7us.jpg"
            // src={data.Imageurl}
            alt=""
          />
          <div style={{ marginLeft: "10px" }}>
            <h4 style={{ color: "white", textDecoration: "underline" }}>
              Description
            </h4>
            <p className="movie-description">
              {/* The social network is so popular movie and most inspirational
              movie. watch it and enjoy with friends */}
              {data.Description}
            </p>
            <div>
              <span>{data.Views}</span>
              {/* <span>Views:430000</span> */}
            </div>
            <div style={{ marginTop: "10px" }}>
              <span>Ratings</span>
              <Rating
                count={5}
                value={data.Overallrating}
                size={24}
                edit={false}
              />
            </div>
            <Link to={`/livewatch/${id}`}>
              <button className="btn-watch" onClick={()=>handleCopyClick(data.Vediourl)}>Tap to copy link</button>
              {isCopied && <span>Copied!</span>}
            </Link>
          </div>
        </div>
        <div className="commentsconatiner">
          <form onSubmit={handlecommentsubmit} className="comment-container">
            <h3>Add Comment</h3>
            <input
              type="text"
              placeholder="Comment here"
              className="add-comment"
              onChange={(e) => {
                settext(e.target.value);
              }}
            />
            <button className="comment-btn">Send</button>
          </form>
          <h1 style={{ color: "white" }}>Comments</h1>
          {data.Comments &&
            data.Comments.map((item, i) => (
              <div className="comment-previous-add">
                <ul key={i}>
                  <li className="list-tag">User: {item.user}</li>
                  <li>comment: {item.text}</li>
                  <li>CreatedAt: {item.createdAt}</li>
                </ul>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default Moviedetails;
