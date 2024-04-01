import React, { useEffect, useState } from "react";
import VedioPlayer from "./Vedioplayers";
import "./Livewatch.css";
import io from "socket.io-client";
import Rating from "react-rating-stars-component";
import axios from "axios";
import { useParams,useLocation } from "react-router-dom";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Loader from "../../src/LOADER/Loader.js";
const socket = io("http://localhost:4000");
const Livewatch = () => {
  // const location = useLocation();
  // const { cloudinaryUrl } = location.state;

  const [loading, setloading] = useState(true);
  const { cloudinaryurl, id } = useParams();
  const [sender, setsender] = useState("");

  const [room, setroom] = useState("");
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  const [playlink, setplaylink] = useState("");

  const [rating, setrating] = useState(0);
  const [mylink,setmylink]=useState('')
  // console.log("this is a cloudinary url:" + cloudinaryUrl);
  // const mylink = 'https://res.cloudinary.com/duzmyzmpa/video/upload/v1705678766/a7pl5vxqzke9p2qwioty.mp4';
  // "https://res.cloudinary.com/duzmyzmpa/video/upload/v1705168817/kh1t8pwdmaweupog9rbl.mp4";
  useEffect(() => {
    socket.on("receive-message", ({ text, sender }) => {
      setmessages((prevMessages) => [...prevMessages, { text, sender }]);
    });
    setloading(false);
    return () => {
      // Disconnect the socket when the component unmounts
      socket.disconnect();
    };
  }, []);
  socket.on("start-vedio", ({ cloudinarylink }) => {
    setplaylink(cloudinarylink);
  });
  const joinroom = (e) => {
    e.preventDefault();
    socket.emit("join-room", room);
  };
  const sendmessage = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room, sender });
    setmessage("");
  };
  const playmovie = () => {
    socket.emit("play-movie", { mylink, room });
  };
  const handlesave = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/user/savemovie/${id}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log("error is in  save movie" + error);
    }
  };

  const handlechangerating = (value) => {
    setrating(value);
  };
  const submitrating = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/movie/ratings/${id}`,
        { rating },
        { withCredentials: true }
      );
      console.log("this is a response ", response.data);
    } catch (error) {
      console.log("this is a error" + error);
    }
  };
  console.log("this is a rating:" + rating);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="livewatchcontainer-main">
      <VedioPlayer url={playlink} />
      <div className="feature-container">
        <div className="rating-component">
          <p>Rate this movie </p>
          <Rating intialRating={rating} onChange={handlechangerating} />
          <button onClick={submitrating}>submit</button>
          <button onClick={handlesave}>Save</button>
        </div>
          <input className="inputs" value={mylink} type="text" placeholder="Paste link here" onChange={(e)=>{
            setmylink(e.target.value)
          }} />
          <button className="btns" onClick={playmovie}>Play</button>
      </div>
      <div className="live-watch-main-container">
        <h3 style={{ color: "white", textAlign: "center" }}>Chat Box</h3>

        <form className="chat-label" onSubmit={joinroom}>
          <label>
            <input
              type="text"
              placeholder="Room name"
              onChange={(e) => {
                setroom(e.target.value);
              }}
            />
          </label>
          <button type="submit" >join</button>
        </form>

        <div className="chat-box-live-display-container">
          {messages.map((m, i) => (
            <div
              style={{
                border: "1px solid cyan",
                height: "40px",
                width: "300px",
                margin: "auto",
                marginTop: "30px",
                borderBottomLeftRadius: "20px",
                borderTopRightRadius: "20px",
                color: "cyan",
                display: "flex",
                justifyContentcen: "center",
                alignItems: "center",
                flexDirection: "column",
                wordWrap: "break-word",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <strong>{m.sender}</strong>
              {m.text}
            </div>
          ))}
          <input
            type="text"
            placeholder="Enter your name"
            className="nameinput"
            value={sender}
            onChange={(e) => {
              setsender(e.target.value);
            }}
          />
        </div>
        <form onSubmit={sendmessage} className="live-watch-input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => {
              setmessage(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Livewatch;
