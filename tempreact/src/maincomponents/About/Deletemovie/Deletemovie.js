import React, { useState } from "react";
import "./Deletemovie.css";
import axios from "axios";
const Deletemovie = () => {
  const [id, setid] = useState("");

  const handlesubmitform = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/movie/deletemovie/${id}`,{
          withCredentials:true
        }
      );
      setid('')
      console.log("this is a response :" + response.data);
    } catch (error) {
      console.log("error is occured");
    }
  };
  return (
    <div className="delete-movie-main-container">
      <h2 style={{ textAlign: "center" }}>Delete Movie</h2>
      <form onSubmit={handlesubmitform}>
        <label>
          <input
            type="text"
            placeholder="Enter id"
            onChange={(e) => {
              setid(e.target.value);
            }}
          />
        </label>
        <button>Delete</button>
      </form>
    </div>
  );
};

export default Deletemovie;
