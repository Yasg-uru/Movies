import React, { useEffect, useState } from "react";
import "./Me.css";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
// Add the logout icon to the library
library.add(faSignOutAlt);
const Me = () => {
  const [data, setdata] = useState({
    name: "",
    email: "",
    role: "",
  });
  const handlelogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    } catch (error) {
        console.log("error is occured :"+error)
    }
  };
  const fetchdata = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/user/me", {
        withCredentials: true,
      });
      const { user } = response.data;
      setdata({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error) {}
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="me-main-container">
      <div className="me-inner-container">
        <div className="me-image-container">
          <img
            src={`https://res.cloudinary.com/duzmyzmpa/image/upload/v1704862806/jutp7gpczbhd0icty7us.jpg`}
            alt="not availabel"
          />
        </div>
        <div className="me-info-container">
          <p>Name : {data.name}</p>
          <p>Email : {data.email}</p>
          <p>Role : {data.role}</p>
        </div>
        <div className="me-logout-container">
          <button onClick={handlelogout}>
            Log out <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
         <Link style={{textDecoration:'none'}}  to={`/getsavedmovies`}> <button className="me-logout-container" >Saved Movies</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Me;
