import React, { useState } from "react";
import "./Createmovie.css";
import axios from "axios"
const Createmovie = () => {
  const [name, setname] = useState("");
  const [description, setdecription] = useState("");
  const [imageurl, setimageurl] = useState(null);
  const [vediourl, setvediourl] = useState(null);



  const handlesubmitform=async (e)=>{
    e.preventDefault();
    try {
        const formdata=new FormData();
       formdata.append('title',name);
       formdata.append('description',description);
       formdata.append('imageurl',imageurl);
       formdata.append('vediourl',vediourl);
       const resposne =await axios.post('http://localhost:4000/api/movie/createmovie',formdata,{
        withCredentials:true
       })
       console.log("created movie ")

    } catch (error) {
        console.log("error is occured in creation of movie")
    }
  }
  const handlefilechange = (e) => {
    const file = e.target.files[0];
    setimageurl(file);
  };
  const handlevediofilechange = (e) => {
    const file = e.target.files[0];
    setvediourl(file);
  };
  return (
    <div className="create-movie-main-container">
      <div className="heading-create-movie">
        <h2 style={{ color: "white", textAlign: "center" }}>Create Movie</h2>
      </div>

      <div className="form-conatainer">
        <form onSubmit={handlesubmitform} className="create-movie-form">
          <label>
            Name
            <input
              type="text"
              placeholder="Movie name"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </label>
          <label>
            Description
            <input
              type="text"
              placeholder="Description"
              onChange={(e) => {
                setdecription(e.target.value);
              }}
            />
          </label>
          <label>
            Image
            <input type="file" onChange={handlefilechange} />
          </label>
          <label>
            Movie
            <input type="file" onChange={handlevediofilechange} />
          </label>
          <button className="create-btn">Create</button>
        </form>
      </div>
    </div>
  );
};

export default Createmovie;
